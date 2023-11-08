// import { User } from "knex/types/tables"
import { User, UserForCreate } from "../utils/interfaces.js";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import { UserDeleteFailIdNotFound } from "../utils/error.js";

export class UserModel {
  async findUserByName(name: string) {
    const user = await db<User>("users").first("name", "id", "created_at")
      .where("name", name);
    return user;
  }
  async getUserPwdHash(id: string) {
    const pwdHash = await db<User>("users").first("pwd_hash").where("id", id);
    return pwdHash;
  }
  async createUser(newUserInfo: UserForCreate) {
    const { name, pwd } = newUserInfo;
    const pwd_hash = await bcrypt.hash(pwd, 12);
    const user = await db<User>("users").insert({ name, pwd_hash }).returning(["id", "name", "created_at"]);
    return user;
  }
  async deleteUser(id: string) {
    const user = await db<User>("users").delete().where("id", id).returning("*")
    if(!user[0]) {
      throw new UserDeleteFailIdNotFound({id});
    }
    return user[0]
  }
}
