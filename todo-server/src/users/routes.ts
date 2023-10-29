import express from "express";
import { UserModel } from "./model.ts";

export const userRouter = express.Router();
const userModel = new UserModel()

//TODO: make this use context
userRouter.delete("/:id", async (req, res, next) => {
  try {
    console.log(`->> HANDLER - delete_user`);
    console.log(JSON.stringify(res.locals))
    const { id } = req.params;
    if (!id) {
      //TODO: make new error for userdelete fail id not provided
      throw new Error();
    }
    const user = await userModel.deleteUser(id)

    //TODO: Check if i am sending all objects as jsons
    res.json(user)
  } catch (err) {
    next(err);
  }
});
