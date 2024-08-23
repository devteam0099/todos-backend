import { secretKey } from "../index.js";
import imageUploader from "../utils/fileUploader.js";
import { client } from "../utils/postgres.config.js";
import jwt from "jsonwebtoken";
import fs from "fs";

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await client.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    //if document found proceed
    if (data.rows.length > 0) {
      //if document found check password
      if (data.rows[0].password === parseInt(password)) {
        //if password authantication successful generate a JWT token
        jwt.sign({ data }, secretKey, { expiresIn: "10h" }, (err, token) => {
          err
            ? res.send({ message: "could not send user credentials" })
            : res.send({ token: token, user: data.rows[0] });
        });
      } else {
        //send response if password validation fails
        res.send({ message: "password is incorrect" });
      }
    } else {
      //send response if user is not found against username send by user
      res.send({ message: "user did not found" });
    }
  } catch (error) {
    //sends a response if user request failed
    res.send({ message: "error in validating login request" });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;
  let profilePicture;
  //check if profile picture send by user or not and create a user with or without profile picture
  if (req.file) {
    profilePicture = await imageUploader(req.file);
    fs.unlinkSync(req.file.path);
  }

  try {
    //check if some other user with same userame already exists.if exists send a message and create a new user if not exists
    const existedUser = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existedUser.rows.length > 0) {
      console.log(existedUser.rows.length);
      res.send({
        message: "the user with this username already exists.try another",
      });
    } else {
      try {
        //if username does not already exists create a new one
        await client.query(
          "INSERT INTO users (name,username,password,profilepicture) VALUES ($1,$2,$3,$4)",
          [name, username, password, profilePicture]
        );
        res.send({ message: "user registered successfully" });
      } catch (error) {
        res.send({ message: "error in registration of new user" });
      }
    }
  } catch (error) {
    res.send({ message: "could not validate and register user.try again!" });
  }
};

export { login, register };
