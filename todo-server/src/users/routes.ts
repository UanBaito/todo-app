import express from "express";
import { UserModel } from "./model.ts";
import { AuthFailContextDoesntMatchRequest, AuthFailNoContext, UserDeleteFailIdNotFound } from "../utils/error.ts";

export const userRouter = express.Router();
const userModel = new UserModel();

userRouter.delete("/:id", async (req, res, next) => {
  const { ctx } = res.locals;
  const { id } = req.params;
  console.log(`->> HANDLER - delete_user`);
  try {
    if (!ctx) {
      throw new AuthFailNoContext(null);
    }
    if (ctx.user.id !== id) {
      throw new AuthFailContextDoesntMatchRequest(null);
    }
    if (!id) {
      throw new UserDeleteFailIdNotFound(null);
    }
    const user = await userModel.deleteUser(id);
    //TODO: delete user token on user delete
    //TODO: Check if i am sending all objects as jsons
    res.json(user);
  } catch (err) {
    next(err);
  }
});
