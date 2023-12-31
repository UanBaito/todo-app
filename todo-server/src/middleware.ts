import { ErrorRequestHandler, RequestHandler } from "express";
import {
  AuthFailContextDoesntMatchRequest,
  AuthFailExpiredToken,
  AuthFailNoToken,
  AuthFailTokenWrongFormat,
  EmptyForm,
  LoginFail,
  RegisterFailOccupiedUsername,
  TodoDeleteFailIdNotFound,
  UserDeleteFailIdNotFound,
} from "./utils/error.js";
import { Ctx } from "./utils/interfaces.js";
import jwt  from "jsonwebtoken";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(
    `->> ERROR-HANDLER - ${err.constructor.name} ${
      err.body ? "- " + JSON.stringify(err.body) : ""
    }\n`,
    `->> CLIENT-ERROR - ${err.clientError}\n`,
    `->> REQUEST-BODY - ${JSON.stringify(req.body)}\n`,
    `->> REQUEST-PATH - ${JSON.stringify(req.path)}`,
  );

  if (
    err instanceof TodoDeleteFailIdNotFound ||
    err instanceof UserDeleteFailIdNotFound || err instanceof EmptyForm
  ) {
    res.status(400).send(
      { "error": err.clientError },
    );
  } else if (
    err instanceof LoginFail || err instanceof AuthFailTokenWrongFormat ||
    err instanceof AuthFailNoToken || err instanceof AuthFailExpiredToken
  ) {
    res.status(401).send({
      "error": err.clientError,
    });
  } else if (err instanceof AuthFailContextDoesntMatchRequest) {
    res.status(403).send({
      "error": err.clientError,
    });
  } else if (err instanceof RegisterFailOccupiedUsername) {
    res.status(409).send({ "error": err.clientError });
  } else {
    console.log(err)
    res.status(500).send({
      "error": "SERVICE ERROR",
    });
  }
};

export const logger: RequestHandler = (req, _res, next) => {
  console.log(
    `->> MIDDLEWARE - cookies - ${
      JSON.stringify(
        Object.keys(req.cookies).length === 0 ? "None" : "Token",
      )
    }`,
  );
  next();
};

export const checkToken: RequestHandler = (req, res, next) => {
  console.log(`->> MIDDLEWARE - auth`);
  const { authToken } = req.cookies;
  try {
    if (!authToken) {
      throw new AuthFailNoToken(null);
    }
    const tokenInfo = jwt.verify(authToken, process.env.JWT_SECRET!);
    if (typeof tokenInfo === "string") {
      //FIXME: figure out what error to throw in these two scenarios
      throw new Error();
    }
    if (!("user" in tokenInfo)) {
      throw new Error();
    }
    (res.locals as Ctx).userInfo = tokenInfo.user;
    next();
  } catch (err) {
    //replacing this jwt error with a custom one makes it more easier to 
    //customize the logging and server response
    if (err instanceof jwt.TokenExpiredError) {
      next(new AuthFailExpiredToken(null));
    }
    next(err);
  }
};
