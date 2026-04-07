import {sequelize} from "../config/db.js";
import { DataTypes } from "sequelize";

const user = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
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
