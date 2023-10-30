import { Todo } from "../utils/interfaces.ts";
import db from "../db/db.ts";
import { TodoDeleteFailIdNotFound } from "../utils/error.ts";

export class TodosModel {
  async createTodo(name: string, cid: string) {
    const todo = await db<Todo>("todos").insert({ name, cid }).returning("*");
    return todo[0];
  }

  async listTodoByCid(cid: string) {
    const todos = await db<Todo>("todos").select().where("cid", cid);
    return todos;
  }
  async getTodoById(id: number) {
    const todo = await db<Todo>("todos").first().where("id", id);
    if (!todo) {
      //TODO: make new todogetfailidnotfound error
      throw new Error();
    }
    return todo
  }

  async deleteTodo(id: number) {
    const todo = await db<Todo>("todos").where("id", id).del().returning("*");
    if (todo.length === 0) {
      throw new TodoDeleteFailIdNotFound({
        id: id,
      });
    }
    return todo[0];
  }
}
