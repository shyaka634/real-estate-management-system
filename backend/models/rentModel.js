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

    startDate:{
        type:DataTypes.DATE,
        allowNull:false
    }

},{tableName:"rent", timestamps:false})

export default rent;
