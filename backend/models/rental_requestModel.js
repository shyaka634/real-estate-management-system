import {sequelize} from "../config/db.js";
import { DataTypes } from "sequelize";

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
}, { tableName: "rental_requests", timestamps: true });

export default rentalRequest;
