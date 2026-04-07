import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Initialize Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME || 'real_estate_management_system',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
        logging: false, // Set to true if you want to see SQL queries in the console
    }
);

// Function to connect to the database
const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error occurred when connecting to DB:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
};

// EXPORT BOTH AT THE BOTTOM (Make sure there is no 'export' word before 'const connectDb' above)
export { connectDb, sequelize };