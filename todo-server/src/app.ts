import express from "express";
import todosRouter from "./todos/routes.ts";
import cors from "cors";
import bodyParser from "body-parser";

export const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/todos", todosRouter);
app.get("/", (_req, res) => {
  res.send("Hello world");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
