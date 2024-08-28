import { secretKey } from "../index.js";
import imageUploader from "../utils/fileUploader.js";
import jwt from "jsonwebtoken";
import mailSender from "../utils/mail.js";
import UserSqlModel from "../models/users.Sequelizemodel.js";
import fs from "fs";
import secure from "../bcrypt.js";
import { comparePass } from "../bcrypt.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await UserSqlModel.findOne({where : {username : username}})
    //if document found proceed
    if (data) {
      //if document found check password
      const checkpass = comparePass(password,data.dataValues.password)
      if (checkpass) {
        //if password authantication successful generate a JWT token
        jwt.sign({ data }, secretKey, { expiresIn: "10h" }, (err, token) => {
          err
            ? res.send({ message: "could not send user credentials" })
            : res.send({ token: token, user: data.dataValues });
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
  const { name, username, password,mail } = req.body;
  let profilePicture;
  //check if profile picture send by user or not and create a user with or without profile picture
  if (req.file) {
    profilePicture = await imageUploader(req.file);
    fs.unlinkSync(req.file.path);
  }

  try {
    const existedUser = await UserSqlModel.findOne({where : {username : username}})
    if (existedUser) {
      console.log(existedUser.dataValues);
      res.send({
        message: "the user with this username already exists.try another",
      });
    } else {
      try {
        const pass = await secure(password)
        console.log(typeof pass,pass)
        if (!pass) {
          res.send({message : 'error in password encoding'})
        }else{
          await UserSqlModel.create({
            userid : 12,
            name : name,
            username : username,
            password : pass,
            profilepicture : profilePicture,
            email : mail
           })
          mailSender(mail)
          res.send({ message: "user registered successfully" });
        }
      } catch (error) {
        console.log(error)
        res.send({ message: "error in registration of new user" });
      }
    }
  } catch (error) {
    console.log(error)
    res.send({ message: "could not validate and register user.try again!" });
  }
};

export { login, register };
