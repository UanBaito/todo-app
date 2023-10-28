import { ErrorRequestHandler, RequestHandler } from "express";
import { TodoDeleteFailIdNotFound } from "./utils/error.ts";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  
  console.log(
    `->> ERROR-HANDLER - ${err.constructor.name} - ${JSON.stringify(err.body)}\n`,
    `->> CLIENT-ERROR - ${err.clientError}`,
  );

  if (err instanceof TodoDeleteFailIdNotFound) {
    res.status(400).send(
      { "error": err.body.clientError },
    );
  }
};

export const logger: RequestHandler = (req, _res, next) => {
  console.log(
    `->> Cookies - ${JSON.stringify(Object.keys(req.cookies).length === 0 ? "None" : req.cookies)}`,
  );
  next();
};
