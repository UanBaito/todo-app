import express from "express"
import todosRouter from "./todos/routes.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use("/api/todos", todosRouter)
app.get("/", (_req, res) => {
  res.send("Hello world")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})


