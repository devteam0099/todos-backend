import pg from "pg";
const { Client } = pg;

//postgres connection
export const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "todosManager",
  password: "12345678",
  port: "5432",
});

const postgresConn = async () => {
  try {
    await client.connect();
    console.log("postgres connected");
  } catch (error) {
    console.log("error in connecting postgres");
  }
};

export default postgresConn;
