import { RequestHandler } from "express";
import jwt from "jsonwebtoken"
import { AuthFailNoToken, AuthFailTokenWrongFormat } from "../utils/error.ts";

export const checkToken: RequestHandler = (req, res, next) => {
console.log(`->> MIDDLEWARE - auth`,
)
  const {authToken} = req.cookies
  try {
   if(!authToken){
      throw new AuthFailNoToken(null)
    } 
    const user = jwt.verify(authToken,"elpepe")
    res.locals.user = user
    next()
  } catch (err) {
    next(new AuthFailTokenWrongFormat(null))
  }
}
