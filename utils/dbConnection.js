import mongoose from "mongoose";
//mongodb connection
const dbConnection = async()=>{
    try {
      const connection = await mongoose.connect(process.env.MONGODBCONNECTION,{dbName : "todoManager"})
      console.log('database connected')
    } catch (error) {
        console.log('error in connecting database')
    }
}
export default dbConnection