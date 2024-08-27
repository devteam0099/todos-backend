import { DataTypes, where } from "sequelize";
import { sequelize } from "../utils/postgres.config.js";

const UserSqlModel = sequelize.define('users',{
    userid : {
        type : DataTypes.INTEGER
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    username : {
        type :  DataTypes.STRING,
        allowNull : true,
        unique : true,
        isLowerCase : false
    },
    password : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    profilepicture : {
        type : DataTypes.STRING,
        allowNull : true
    }
    
},{timestamps :false})

export default UserSqlModel