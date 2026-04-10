import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import user from "./userModel.js";
import property from "./propertyModel.js";

const rent = sequelize.define("Rent", {
    rent_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "user_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    property_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "property",
            key: "property_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { tableName: "rent", timestamps: false });

// Associations
rent.belongsTo(user, { foreignKey: "tenant_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
rent.belongsTo(property, { foreignKey: "property_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

user.hasMany(rent, { foreignKey: "tenant_id" });
property.hasMany(rent, { foreignKey: "property_id" });

export default rent;
