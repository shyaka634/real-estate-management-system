import {sequelize} from "../config/db.js";
import { DataTypes } from "sequelize";
<<<<<<< HEAD
const user= sequelize.define("User",{
    user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
=======

const user = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM("tenant", "landlord"),
        defaultValue: "landlord"
    }
}, { tableName: "user", timestamps: false });

export default user;
