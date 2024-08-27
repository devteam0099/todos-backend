import imageUploader from "../utils/fileUploader.js";
import todoSqlModel from "../models/todos.sequelizemodel.js";
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
    await todoSqlModel.create({
      todoname: name,
      tododescription: description,
      todoimage: image,
      createdby: username,
      completed: false,
    });
    res.send({ message: "todo saved successfully" });
  } catch (error) {
    console.log(error);
    res.send({ message: "server error", error: error });
  }
};

const completeTodos = async (req, res) => {
  const { completeId } = req.body;
  try {
    await todoSqlModel.update(
      { completed: true },
      { where: { id: completeId } }
    );
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
      await todoSqlModel.update(
        {
          todoname: todoName,
          tododescription: todoDescription,
          todoimage: image,
        },
        { where: { id: id } }
      );
      res.send({ message: "todo has been updated successfully" });
    } catch (error) {
      res.send({ message: "error in updating todo" });
    }
  } else {
    try {
      await todoSqlModel.update(
        {
          todoname: todoName,
          tododescription: todoDescription,
        },
        { where: { id: id } }
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
    await todoSqlModel.destroy({ where: { id: deleteId } });
    res.send({ message: "todo has been deleted successfully" });
  } catch (error) {
    res.send({ message: "error in deleting todo" });
  }
};

const getTodos = async (req, res) => {
  const { user } = req.query;
  console.log(user);
  try {
    const data = await todoSqlModel.findAll({ where: { createdby: user } });
    const dataArray = [];
    for (let i = 0; i < data.length; i++) {
      dataArray.push(data[i].dataValues);
    }
    res.json(dataArray);
  } catch (error) {
    res.send({ message: "error in fetching todos" });
  }
};

export { addTodos, completeTodos, editTodos, deleteTodos, getTodos };
