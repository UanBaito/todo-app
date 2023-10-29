import express from "express";
import { AuthFailTokenWrongFormat, LoginFail } from "../utils/error.ts";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { UserModel } from "../users/model.ts";
import bcrypt from "bcrypt";
import { UserForCreate } from "../utils/interfaces.ts";

export const loginRouter = express.Router();
let userModel = new UserModel();

loginRouter.post("/login", async (req, res, next) => {
  console.log(`->> HANDLER - login`);
  try {
    const { name, pwd } = req.body;
    if (!name || !pwd) {
      throw new LoginFail(null);
    }

    const user = await userModel.findUserByName(name);
    if (!user) {
      throw new LoginFail(null);
    }

    const result = await userModel.getUserPwdHash(user.id);

    if (!result) {
      //FIXME: come up with better error describer, since in case the user exists,
      //result should never be undefined. There is a not null constraint on the
      //db for this column (pwd_hash).
      throw new LoginFail(null);
    }

    const match = await bcrypt.compare(pwd, result.pwd_hash);
    if (!match) {
      throw new LoginFail(null);
    }

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      name,
    }, process.env.JWT_SECRET!);

    const serializedToken = serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedToken);

    res.json({ succes: true });
  } catch (err) {
    next(err);
  }
});

loginRouter.post("/logout", (req, res, next) => {
  console.log(`->> HANDLER - logout`);
  const { authToken } = req.cookies;
  try {
    if (!authToken) {
      res.send("USER WAS NOT LOGGED IN");
    }

    jwt.verify(authToken, process.env.JWT_SECRET!);

    const serializedToken = serialize("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedToken);

    res.send({ "succes": true });
  } catch (err) {
    next(new AuthFailTokenWrongFormat(null));
  }
});

loginRouter.post("/register", async (req, res, next) => {
  console.log(`->> HANDLER - register`);
  try {
    const newUserInfo: UserForCreate = req.body;
    if (!newUserInfo.name || !newUserInfo.pwd) {
      //TODO: make error for registerfail for empty credentials
      throw new Error("empty credentials");
    }
    const existsUsername = await userModel.findUserByName(newUserInfo.name);
    if (!!existsUsername) {
      //TODO: make registerfail new error for occupied username
      throw new Error("user alredy exist");
    }
    const user = await userModel.CreateUser(newUserInfo)
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
