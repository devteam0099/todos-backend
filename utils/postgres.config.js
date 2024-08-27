import pg from "pg";
const { Client } = pg;

//postgres connection
 export const client = new Client({      //postgresql://postgres:12345678@localhost:5432/todosManager
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
// const sequelize = new Sequelize('postgresql://postgres:12345678@localhost:5432/todosManager')
// try {
//   sequelize.authenticate()
//   console.log('db connected')
// } catch (error) {
//   console.log(error)  
// }
};

export default postgresConn;
