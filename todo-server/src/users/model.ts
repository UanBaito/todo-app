// import { User } from "knex/types/tables"
import db from "../db/db.ts";

export class UserModel {
  async findUserByName(name: string) {
    //TODO: make username unique on db, or use email instead
    //FIXME: make this type-safe
    const user = await db("users").first("name", "id", "created_at").where("name", name);
    return user;
  }
  async getUserPwdHash(id: string) {
    const pwdHash = await db("users").first("pwd_hash").where("id", id)
    return pwdHash
  }
}
