// import { User } from "knex/types/tables"
import { User } from "../utils/interfaces.ts";
import db from "../db/db.ts";

export class UserModel {
  async findUserByName(name: string) {
    const user = await db<User>("users").first("name", "id", "created_at").where("name", name);
    return user;
  }
  async getUserPwdHash(id: string) {
    const pwdHash = await db<User>("users").first("pwd_hash").where("id", id)
    return pwdHash
  }
}
