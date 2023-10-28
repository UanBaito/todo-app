import express, { ErrorRequestHandler } from "express";
import todosRouter from "./todos/routes.ts";
import cors from "cors";
import bodyParser from "body-parser";
import { TodoDeleteFailIdNotFound } from "./utils/error.ts";

export const app = express();
const port = 3000;

//just to print a line between request
app.use((_req, _res, next)=> {
  _res.on("finish", () => {
    console.log()
  })
  next()
})

app.use(cors());
app.use(bodyParser.json());
app.use("/api/todos", todosRouter);

app.get("/", (_req, res) => {
  res.send("Hello world");
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(`->> ERROR-HANDLER - ${err.constructor.name} - ${JSON.stringify(err.body)}`)

  if (err instanceof TodoDeleteFailIdNotFound) {
    res.status(400).send(
      { "error": "INVALID_PARAMS" },
    );
  }
};

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}\n`);
    
  });
}
