import express, { urlencoded } from "express";
import corsHandler from "./utils/cors.js";
import cors from "cors";
import 'dotenv/config'
import auth from "./routes/auth.route.js";
import todos from './routes/todos.route.js'
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
 
// routing
app.use("/api/signup", auth);
app.use("/api/login", auth);
app.use("/api/save-todos", todos);
app.use("/api/get-todos", todos);
app.use("/api/edit-todos", todos);
app.use("/api/delete-todos", todos);
app.use("/api/complete-todos", todos);

app.listen(port, () => {
  console.log(`Todos backend is running on port ${port}`);
});
