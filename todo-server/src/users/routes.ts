import express from "express";
import { UserModel } from "./model.ts";

export const userRouter = express.Router();
const userModel = new UserModel();

//TODO: make this use context
userRouter.delete("/:id", async (req, res, next) => {
  const { ctx } = res.locals;
  const { id } = req.params;
  console.log(`->> HANDLER - delete_user`);
  try {
    if (!ctx) {
      //TODO: Create new error for no context
      throw new Error();
    }
    if (ctx.user.id !== id) {
      //TODO: Create new error for unauthorized action for context
      throw new Error();
    }
    if (!id) {
      //TODO: make new error for userdelete fail id not provided
      throw new Error();
    }
    const user = await userModel.deleteUser(id);
    //TODO: delete user token on user delete
    //TODO: Check if i am sending all objects as jsons
    res.json(user);
  } catch (err) {
    next(err);
  }
});
