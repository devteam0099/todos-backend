import mongoose from "mongoose";
//mongodb connection
const dbConnection = async()=>{
    try {
      const connection = await mongoose.connect('mongodb+srv://personal:000000000000@containor.zefivfy.mongodb.net/',{dbName : "todoManager"})
      console.log('database connected')
    } catch (error) {
        console.log('error in connecting database')
    }
}
export default dbConnection