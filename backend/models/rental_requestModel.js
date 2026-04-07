import {sequelize} from "../config/db.js";
import { DataTypes } from "sequelize";
<<<<<<< HEAD
import property from "./propertyModel.js";
const rental_request= sequelize.define("Request",{
    request_id: {
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

    status:{
     type:DataTypes.ENUM("Active","Not Active"),
     defaultValue:"Active",
     
=======
>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc

const rentalRequest = sequelize.define("RentalRequest", {
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
    status: {
        type: DataTypes.ENUM("Active", "Not Active"),
        defaultValue: "Active"
    }
<<<<<<< HEAD
},{tableName:"rental_request", timestamps:false})
=======
}, { tableName: "rental_requests", timestamps: true });
>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc

export default rentalRequest;
