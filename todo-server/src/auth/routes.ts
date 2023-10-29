import express from "express";
import {
  AuthFailTokenWrongFormat,
  LoginFail,
} from "../utils/error.ts";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const loginRouter = express.Router();

loginRouter.post("/login", (req, res, next) => {
  console.log(`->> HANDLER - login`);
  try {
    let { username, password } = req.body;
    if (username !== "onebyte" || password !== "123") {
      throw new LoginFail(null);
    }

    //TODO: generate actual secret token
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      username,
    }, "elpepe");

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
  let { authToken } = req.cookies;
  try {

    if (!authToken) {
      res.send("USER WAS NOT LOGGED IN");
    }

    jwt.verify(authToken, "elpepe");

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
