import express from "express";
import { create_todo, delete_todo, list_todo } from "./model.ts";
import { TodoForCreate } from "../utils/interfaces.ts";

const todosRouter = express.Router();

todosRouter.get("/", async (_req, res, next) => {
  console.log(`->> HANDLER - list_todo`)
  try {
    const todos_list = await list_todo();
    res.send(todos_list);
  } catch (err) {
    next(err);
  }
});

todosRouter.post("/", async (req, res, next) => {
  console.log(`->> HANDLER - create_todo`)
  try {
    const todo_for_create: TodoForCreate = req.body;
    const todo = await create_todo(todo_for_create.name);
    res.status(201).send(todo);
  } catch (err) {
    next(err);
  }
});

todosRouter.delete("/:id", async (req, res, next) => {
  console.log(`->> HANDLER - delete_todo`)
  try {
    const params = req.params;
    const id = parseInt(params.id);
    const todo = await delete_todo(id);
    res.send(todo);
  } catch (err) {
    next(err);
  }
});

export default todosRouter;
