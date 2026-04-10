import { Sequelize } from "sequelize";

// Initialize Sequelize
const sequelize = new Sequelize(
    'real_estate_management_system',
     'root',
     '',
    {
        host:"localhost",
        dialect: 'mysql',
        
    }
);

// Function to connect to the database
export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error occurred when connecting to DB:", error);
        
    }
};

// EXPORT BOTH AT THE BOTTOM (Make sure there is no 'export' word before 'const connectDb' above)
export default sequelize;