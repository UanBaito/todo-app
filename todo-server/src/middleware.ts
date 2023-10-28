import { ErrorRequestHandler, RequestHandler } from "express";
import { LoginFail, TodoDeleteFailIdNotFound } from "./utils/error.ts";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  
  console.log(
    `->> ERROR-HANDLER - ${err.constructor.name} ${err.body ? "- " + JSON.stringify(err.body) : ""}\n`,
    `->> CLIENT-ERROR - ${err.clientError}\n`,
    `->> REQUEST-BODY - ${JSON.stringify(req.body)}`,
  );

  if (err instanceof TodoDeleteFailIdNotFound) {
    res.status(400).send(
      { "error": err.clientError },
    );
  } else if(err instanceof LoginFail) {
    res.status(403).send({
      "error": err.clientError
    })
  }
};

export const logger: RequestHandler = (req, _res, next) => {
  console.log(
    `->> Cookies - ${JSON.stringify(Object.keys(req.cookies).length === 0 ? "None" : req.cookies)}`,
  );
  next();
};
