import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
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
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    role:{
        type:DataTypes.ENUM("tenant","landlord"),
        defaultValue:"landlord"
    }
},{tableName:"user", timestamps:false})
export default user;