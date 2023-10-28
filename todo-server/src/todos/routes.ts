import express from "express";
import { create_todo, delete_todo, list_todo } from "./model.ts";
import { TodoForCreate } from "../utils/interfaces.ts";

const todosRouter = express.Router();

todosRouter.get("/", async (_req, res) => {
  try {
    const todos_list = await list_todo();
    res.send(todos_list);
  } catch (err) {
    res.status(500).send("INTERNAL_SERVICE_ERROR");
  }
});

todosRouter.post("/", async (req, res) => {
  try {
    const todo_for_create: TodoForCreate = req.body;
    const todo = await create_todo(todo_for_create.name);
    res.send(todo);
  } catch (err) {
    res.status(500).send("INTERNAL_SERVICE_ERROR");
  }
});

todosRouter.delete("/:id", async (req, res) => {
  try {
    const params = req.params
    const id = parseInt(params.id)
    const todo = await delete_todo(id)
    res.send(todo)
 } catch (err) {
    res.status(500).send("INTERNAL_SERVICE_ERROR");
  }
})

export default todosRouter;
