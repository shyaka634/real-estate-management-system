import sequelize from "../../config/db.js";
import user from "./userModel.js";
import property from "./propertyModel.js";
import rent from "./rentModel.js";
import rentalRequest from "./rental_requestModel.js";

// Associations
property.belongsTo(user, { foreignKey: "landlord_id", as: "landlord" });

rent.belongsTo(user, { foreignKey: "tenant_id", as: "tenant" });
rent.belongsTo(property, { foreignKey: "property_id", as: "property" });

rentalRequest.belongsTo(user, { foreignKey: "tenant_id", as: "tenant" });
rentalRequest.belongsTo(property, { foreignKey: "property_id", as: "property" });

user.hasMany(property, { foreignKey: "landlord_id", as: "properties" });
user.hasMany(rent, { foreignKey: "tenant_id", as: "rents" });
user.hasMany(rentalRequest, { foreignKey: "tenant_id", as: "requests" });

export { user, property, rent, rentalRequest };
export default sequelize;

