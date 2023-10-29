import { ErrorRequestHandler, RequestHandler } from "express";
import { AuthFailNoToken, AuthFailTokenWrongFormat, LoginFail, TodoDeleteFailIdNotFound } from "./utils/error.ts";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
   
  console.log(
    `->> ERROR-HANDLER - ${err.constructor.name} ${err.body ? "- " + JSON.stringify(err.body) : ""}\n`,
    `->> CLIENT-ERROR - ${err.clientError}\n`,
    `->> REQUEST-BODY - ${JSON.stringify(req.body)}\n`,
    `->> REQUEST-PATH - ${JSON.stringify(req.path)}`,
  );

  if (err instanceof TodoDeleteFailIdNotFound) {
    res.status(400).send(
      { "error": err.clientError },
    );
  } else if(err instanceof LoginFail || err instanceof AuthFailTokenWrongFormat || AuthFailNoToken) {
    res.status(403).send({
      "error": err.clientError
    })
  } else {
    res.status(500).send({
      "error": "SERVICE ERROR"
    })
  }
};

export const logger: RequestHandler = (req, _res, next) => {
  console.log(
    `->> MIDDLEWARE - cookies - ${JSON.stringify(Object.keys(req.cookies).length === 0 ? "None" : req.cookies)}`,
  );
  next();
};
