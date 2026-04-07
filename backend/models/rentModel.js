<<<<<<< HEAD
import sequelize from "../config/db.js";
import { DataTypes, INTEGER } from "sequelize";
const rent=  sequelize.define("Rent",{
    rent_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    tenant_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"user",
            key:"user_id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    },
    property_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"property",
            key:"property_id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    },
=======
import {sequelize} from "../config/db.js";
import { DataTypes } from "sequelize";
>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc

const rent = sequelize.define("Rent", {
    tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    property_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "property",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
<<<<<<< HEAD

},{tableName:"rent", timestamps:false})
=======
}, { tableName: "rent", timestamps: true });
>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc

export default rent;
