import express from "express"

const todosRouter = express.Router()

todosRouter.get("/", (_req, res) => {
res.send("todos")
})

export default todosRouter


