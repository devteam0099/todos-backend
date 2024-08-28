import jwt from "jsonwebtoken";
import { secretKey } from "../index.js";
import { comparePass } from "../bcrypt.js";

const authanticateUser = async(req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const { username, password } = req.body;
  //check if token in authorization found or not
  if (authHeaders) {
    //if token found take token and secret key for verification
    jwt.verify(authHeaders, secretKey, async(err, decode) => {
      if (err) {
        console.log("error in token. redirecting to next");
        //if error call the next function that checks and match from database
        next();
      } else {
        const checkpass = await comparePass(password,decode.data.password)
        //if token validates decode it and checks if usrname in token matches the username sent by user
        if (decode.data.username === username) {
          console.log("user verified using token");
          //if username matches match the password and if password match send decoded credentials to client site
          checkpass
            ? res.send({ auth: decode.data })
            : res.send({ message: "incorrect password" });
        } else {
          //if username does not match the decoded username call next function that checks credentials from database
          next();
        }
      }
    });
  } else {
    //if authorization headers not found call the next function which will check credentials from database
    console.log("do not find headers. move to next");
    next();
  }
};
export default authanticateUser;
