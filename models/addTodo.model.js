import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todoName: {
      required: true,
      type: String,
    },
    todoDescription: {
      required: true,
      type: String,
    },
    todoImage: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Todos = mongoose.model("todos", todoSchema);
