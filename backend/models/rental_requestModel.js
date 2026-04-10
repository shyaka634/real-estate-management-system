
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import property from "./propertyModel.js";
import user from "./userModel.js"; // Assume userModel.js exists

const rental_request = sequelize.define("Request", {
    request_id: {
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
    status: {
        type: DataTypes.ENUM("Active", "Not Active"),
        defaultValue: "Active",
    }
}, { 
    tableName: "request",
    timestamps: true 
});

// Associations
rental_request.belongsTo(user, { foreignKey: "tenant_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
rental_request.belongsTo(property, { foreignKey: "property_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Optionally, the inverse associations can also be added
user.hasMany(rental_request, { foreignKey: "tenant_id" });
property.hasMany(rental_request, { foreignKey: "property_id" });

export default rental_request;