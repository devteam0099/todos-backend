import { sequelize } from "../utils/postgres.config.js";
import { DataTypes } from "sequelize";

const todoSchema = {
  todoname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tododescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  todoimage: {
    type: DataTypes.STRING,
  },
  createdby: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
};

const todoSqlModel = sequelize.define("todos", todoSchema, {
  timestamps: false,
});
export default todoSqlModel;
