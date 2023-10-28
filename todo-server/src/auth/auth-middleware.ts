import { RequestHandler } from "express";
import {verify} from "jsonwebtoken"

export const checkToken: RequestHandler = (req, res, next) => {
  const {authToken} = req.cookies
  try {
    const user = verify(authToken,"secret")
    res.locals.user = user
    next()
  } catch (err) {
    next(err)
  }
}
