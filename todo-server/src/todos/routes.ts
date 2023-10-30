import express from "express";
import { TodosModel } from "./model.ts";
import { Ctx, TodoForCreate, TodoForUpdate } from "../utils/interfaces.ts";
import {
  AuthFailContextDoesntMatchRequest,
  AuthFailNoContext,
  EmptyForm,
} from "../utils/error.ts";

const todosRouter = express.Router();
const todosModel = new TodosModel();

//TODO: implement context for all of these
todosRouter.get("/", async (_req, res, next) => {
  console.log(`->> HANDLER - list_todo`);
  const { userInfo } = res.locals as Ctx;
  try {
    if (!userInfo) {
      throw new AuthFailNoContext(null);
    }
    const todos_list = await todosModel.listTodoByCid(userInfo.id);
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
  const { id } = req.params;
  try {
    if (!userInfo) {
      throw new AuthFailNoContext(null);
    }
    if (!id) {
      throw new EmptyForm(null);
    }

    const parsedId = parseInt(id);
    const todo = await todosModel.getTodoById(parsedId);
    if (todo.cid !== userInfo.id) {
      console.log(todo.id, userInfo.id);
      throw new AuthFailContextDoesntMatchRequest(null);
    }

    const deletedTodo = await todosModel.deleteTodo(parsedId);
    res.send(deletedTodo);
  } catch (err) {
    next(err);
  }
});

todosRouter.put("/", async (req, res, next) => {
  const updateInfo: TodoForUpdate = req.body();
  const userInfo = res.locals as Ctx;
  try {
    if (!userInfo) {
      throw new AuthFailNoContext(null);
    }

    if (!updateInfo.name || typeof updateInfo.isCompleted !== "boolean") {
      //TODO: fix
      throw new EmptyForm(null);
    }

    const todo = await todosModel.updateTodo(
      updateInfo.id,
      updateInfo.name,
      updateInfo.isCompleted,
    );
    res.send(todo);
  } catch (err) {
    next(err);
  }
});
export default todosRouter;
