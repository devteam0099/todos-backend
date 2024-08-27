import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('postgresql://postgres:12345678@localhost:5432/todosManager')

const postgresConn = async () => {  
 try {
   sequelize.authenticate()
   console.log('db connected')
 } catch (error) {
   console.log(error)  
 }
};

export {sequelize}
export default postgresConn;
