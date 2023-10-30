import { Todo } from "../utils/interfaces.ts";
import db from "../db/db.ts";
import { TodoDeleteFailIdNotFound } from "../utils/error.ts";

export async function create_todo(name: string, cid: string) {
  const todo = await db<Todo>("todos").insert({ name, cid }).returning("*");
  return todo[0];
}

export async function list_todo() {
  const todos = await db<Todo>("todos").select()
  return todos
}

export async function delete_todo(id: number) {
  const todo = await db<Todo>("todos").where("id", id).del().returning("*")
   if (todo.length === 0) {
     throw new TodoDeleteFailIdNotFound({
      id: id
    })
   }
  return todo[0]
}

