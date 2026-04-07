import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import user from "./userModel.js"; // Import the user model

const property = sequelize.define("Property", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    landlord_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "user_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, { tableName: "property", timestamps: true });

// Association: Property belongsTo User (landlord)
property.belongsTo(user, { foreignKey: "landlord_id", as: "landlord", onDelete: "CASCADE", onUpdate: "CASCADE" });
// Optionally, user.hasMany(property, { foreignKey: "landlord_id", as: "properties" });

export default property;
