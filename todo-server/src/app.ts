import express from "express";
import todosRouter from "./todos/routes.ts";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { checkToken, errorHandler, logger } from "./middleware.ts";
import { loginRouter } from "./auth/routes.ts";
import { userRouter } from "./users/routes.ts";

export const app = express();
const port = 3000;

//just to print a line between request
app.use((_req, _res, next) => {
  _res.on("finish", () => {
    console.log();
  });
  next();
});

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

const apiRouter = express.Router();
apiRouter.use("/auth", loginRouter);
apiRouter.use(checkToken);
apiRouter.use("/todos", todosRouter);
apiRouter.use("/users", userRouter);
app.use("/api", apiRouter);

app.get("/", (_req, res) => {
  res.send("Hello world");
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}\n`);
  });
}
