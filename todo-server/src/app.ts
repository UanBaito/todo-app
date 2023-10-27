import express from "express"
import todosRouter from "./todos/routes.ts"

const app = express()
const port = 3000

app.use("/todos", todosRouter)

app.get("/", (_req, res) => {
  res.send("Hello world")
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
