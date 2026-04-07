import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
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
     

    }
},{tableName:"rental_request", timestamps:false})

export default rental_request;