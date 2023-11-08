import { Todo } from "../utils/interfaces.js";
import db from "../db/db.js";
import { TodoDeleteFailIdNotFound } from "../utils/error.js";

export class TodosModel {
  async createTodo(name: string, cid: string) {
    const todo = await db<Todo>("todos").insert({ name, cid }).returning("*");
    return todo[0];
  }

  async listTodoByCid(cid: string) {
    const todos = await db<Todo>("todos").select().where("cid", cid).orderBy(
      "created_at",
      "desc",
    );
    return todos;
  }

  async getTodoById(id: number) {
    const todo = await db<Todo>("todos").first().where("id", id);
    if (!todo) {
      //TODO: make new todogetfailidnotfound error
      throw new Error();
    }
    return todo;
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

  async deleteCompletedTodosByCid(cid: string) {
    const deletedRows = await db<Todo>("todos").delete().where("cid", cid)
      .andWhere("isCompleted", true);
    return deletedRows;
  }

  async updateTodo(id: number, name: string, isCompleted: boolean) {
    const todo = await db<Todo>("todos").where("id", id).update({
      name,
      isCompleted,
    }).returning("*");
    if (todo.length === 0) {
      //TODO: make new todoupdateidnotfound error
      throw new Error();
    }
    return todo[0];
  }
}
