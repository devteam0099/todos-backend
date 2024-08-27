import { Sequelize,DataTypes } from "sequelize";

const sequelize = new Sequelize('sqlite::memory:')

const User = sequelize.define('Users',{
    name : {
        type : DataTypes.STRING,
        allowNull : true
    },
    username : {
        type :  DataTypes.STRING,
        allowNull : true,
        unique : true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : true
    },
    profilePIcture : {
        type : DataTypes.STRING
    },
    
    
},{tableName : 'users'},{TimeRanges : true})

const savedata = async()=>{
    const data = User.build({name : 'jame'})
try {
    await data.save()
    console.log('data saved ')
} catch (error) {
    console.log(error)
}
}
export default savedata