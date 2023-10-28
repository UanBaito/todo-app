import { Todo } from "knex/types/tables";
import db from "../db/db.ts";

export async function create_todo(name: string) {
  console.log(`->> HANDLER - create_todo`)
  const todo = await db<Todo>("todos").insert({ name: name }).returning("*");
  return todo[0];
}

export async function list_todo() {
  console.log(`->> HANDLER - list_todo`)
  const todos = await db<Todo>("todos").select()
  return todos
}

export async function delete_todo(id: number) {
  console.log(`->> HANDLER - delete_todo`)
  const todo = await db<Todo>("todos").where("id", id).del().returning("*")
  //TODO: throw error if id was not found
  // if (todo.length === 0) {
  //   return 
  // }
  return todo[0]
}

