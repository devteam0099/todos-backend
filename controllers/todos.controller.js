import imageUploader from "../utils/fileUploader.js";
import { client } from "../utils/postgres.config.js";
import fs from "fs";

const addTodos = async (req, res) => {
  const { name, description, username } = req.body;
  let image = null;
  //upload image to cloudinary if found
  if (req.file) {
    try {
      image = await imageUploader(req.file);
      fs.unlinkSync(req.file.path);
    } catch (error) {
      res.send({ message: "error in uploading image! try again" });
    }
  }
  //save data into database
  try {
    await client.query(
      "INSERT INTO todos(todoname,tododescription,todoimage,createdby) VALUES ($1,$2,$3,$4)",
      [name, description, image, username]
    );
    res.send({ message: "todo saved successfully" });
  } catch (error) {
    res.send({ message: "server error", error: error });
  }
};

const completeTodos = async (req, res) => {
  const { completeId } = req.body;
  try {
    await client.query("UPDATE todos SET completed = true WHERE id = $1", [completeId,]);
    res.send({ message: "todo has been mark as completed" });
  } catch (error) {
    res.send({ message: "could not mark todo as completed" });
  }
};

const editTodos = async (req, res) => {
  const { todoName, todoDescription, id } = req.body;
  //check if user want to edit image with data or simplely edit text fields. edit todo based on image found or not
  if (req.file) {
    let image;
    image = await imageUploader(req.file);
    fs.unlinkSync(req.file.path);
    try {
      await client.query(
        "UPDATE todos SET todoname = $1, tododescription = $2, todoimage = $3 WHERE id = $4",
        [todoName, todoDescription, image, id]
      );
      res.send({ message: "todo has been updated successfully" });
    } catch (error) {
      res.send({ message: "error in updating todo" });
    }
  } else {
    try {
      await client.query(
        "UPDATE todos SET todoname = $1,tododescription = $2  WHERE id = $3",
        [todoName, todoDescription, id]
      );
      res.send({ message: "todo has been updated successfully without image" });
    } catch (error) {
      res.send({ message: "error in updating todo without image" });
    }
  }
};

const deleteTodos = async (req, res) => {
  const { deleteId } = req.query;
  try {
    await client.query("DELETE FROM todos WHERE id = $1", [deleteId]);
    res.send({ message: "todo has been deleted successfully" });
  } catch (error) {
    res.send({ message: "error in deleting todo" });
  }
};

const getTodos = async (req, res) => {
  const { user } = req.query;
  try {
    const data = await client.query(
      "SELECT * FROM todos WHERE createdby = $1",[user]);
    res.json(data.rows);
  } catch (error) {
    res.send({ message: "error in fetching todos" });
  }
};

export { addTodos, completeTodos, editTodos, deleteTodos, getTodos };
