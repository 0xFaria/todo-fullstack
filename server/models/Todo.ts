import mongoose, { mongo } from "mongoose"
import { Schema } from "mongoose"

const TodoSchema = new Schema({
  text: {
    type: String,
    require: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
})

const Todo = mongoose.model("Todo", TodoSchema)

export default Todo
