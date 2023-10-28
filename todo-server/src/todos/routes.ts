import express from "express";
import { list_todo } from "./model.ts";

const todosRouter = express.Router();

todosRouter.get("/", async (_req, res) => {
  try {
    const todos_list = await list_todo();
    res.send(todos_list);
  } catch (err) {
    res.status(500).send("INTERNAL_SERVICE_ERROR")
  }
});

export default todosRouter;
