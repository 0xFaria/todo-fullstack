import express, { response, urlencoded } from "express"
import mongoose from "mongoose"
import cors from "cors"
import Todo from "./models/Todo"


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://127.0.0.1:27017/todo", {
})
  .then(() => console.log("Connected"))
  .catch(console.error)


//ROTAS

app.get("/todos", async (req, res) => {
  const todos = await Todo.find()
  res.json(todos)
})

app.post("/add", async (req, res) => {
  const { text } = req.body
  Todo.collection.insertOne({ text }).then(() => {
    res.json("Adicionado")
  }).catch((err) => {
    console.log(err)
  })
})

app.delete("/del/:id", async (req, res) => {
  const idToDelete = req.params.id
  await Todo.findOneAndDelete({ _id: idToDelete })
    .catch((err) => {
      res.json("Error to find a task")
    })
  res.json("Deleted")
})

app.listen(8000, (() => console.log("Running")))