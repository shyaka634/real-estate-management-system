import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

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
}, { tableName: "rent", timestamps: true });

export default rent;
