import express from "express";
import {TodosModel} from "./model.ts";
import { Ctx, TodoForCreate } from "../utils/interfaces.ts";
import { AuthFailNoContext } from "../utils/error.ts";

const todosRouter = express.Router();
const todosModel = new TodosModel()

//TODO: implement context for all of these
todosRouter.get("/", async (_req, res, next) => {
  console.log(`->> HANDLER - list_todo`);
  const { userInfo } = res.locals as Ctx;
  try {
    if (!userInfo) {
      throw new AuthFailNoContext(null);
    }
    const todos_list = await todosModel.listTodo();
    res.send(todos_list);
  } catch (err) {
    next(err);
  }
});

todosRouter.post("/", async (req, res, next) => {
  console.log(`->> HANDLER - create_todo`);
  const { userInfo } = res.locals as Ctx;
  try {
    if (!userInfo) {
      throw new AuthFailNoContext(null);
    }
    const todo_for_create: TodoForCreate = req.body;
    const todo = await todosModel.createTodo(todo_for_create.name, userInfo.id);
    res.status(201).send(todo);
  } catch (err) {
    next(err);
  }
});

todosRouter.delete("/:id", async (req, res, next) => {
  console.log(`->> HANDLER - delete_todo`);
  const { userInfo } = res.locals as Ctx;
  try {
    if (!userInfo) {
      throw new AuthFailNoContext(null);
    }
    const params = req.params;
    const id = parseInt(params.id);
    const todo = await todosModel.deleteTodo(id);
    res.send(todo);
  } catch (err) {
    next(err);
  }
});

export default todosRouter;
