import express, { urlencoded } from "express";
import corsHandler from "./utils/cors.js";
import cors from "cors";
import { loginRoute, registerRoute } from "./routes/auth.route.js";
import {saveTodosRoute,editTodosRoute,deletetodosRoute,completeTodosRoute,getTodosRoute,} from "./routes/todos.route.js";
import cloudinayConfig from "./utils/uploader.config.js";
import postgresConn from "./utils/postgres.config.js";
export const secretKey = "auth-user";
const app = express();
const port = 3000;
// middlewares
app.use(cors(corsHandler()));
app.use(express.json());
app.use(urlencoded({ extended: true }));

// config and connections
cloudinayConfig();
postgresConn()
//middlewares for routing
app.use("/api/signup", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/save-todos", saveTodosRoute);
app.use("/api/get-todos", getTodosRoute);
app.use("/api/edit-todos", editTodosRoute);
app.use("/api/delete-todos", deletetodosRoute);
app.use("/api/complete-todos", completeTodosRoute);

app.listen(port, () => {
  console.log(`Todos backend is running on port ${port}`);
});
