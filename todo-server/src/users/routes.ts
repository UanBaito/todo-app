import express from "express";
import { UserModel } from "./model.js";
import {
  AuthFailContextDoesntMatchRequest,
  AuthFailNoContext,
  UserDeleteFailIdNotFound,
} from "../utils/error.js";
import { Ctx } from "../utils/interfaces.js";
import { serialize } from "cookie";

export const userRouter = express.Router();
const userModel = new UserModel();

userRouter.delete("/:id", async (req, res, next) => {
  const { userInfo } = res.locals as Ctx;
  const { id } = req.params;
  console.log(`->> HANDLER - delete_user`);
  try {
    if (!userInfo) {
      throw new AuthFailNoContext(null);
    }
    if (userInfo.id !== id) {
      throw new AuthFailContextDoesntMatchRequest(null);
    }
    if (!id) {
      throw new UserDeleteFailIdNotFound(null);
    }
    const user = await userModel.deleteUser(id);
    const serializedToken = serialize("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedToken);
    //TODO: Check if i am sending all objects as jsons
    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/", async (_req, res, next) => {
  console.log("->> HANDLER - get_user");
  const { userInfo } = res.locals as Ctx;
  try {
    if (!userInfo) {
      throw new AuthFailNoContext(null);
    }
    res.send(userInfo);
  } catch (err) {
    next(err);
  }
});
