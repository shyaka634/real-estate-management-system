import express from "express";
import cors from "cors";
import session from "express-session";
import { connectDb } from "./config/db.js";
import { isAuthenticated } from "./middleware/authMiddleware.js";
import userRouter from "./routes/userRouter.js";
import propertyRoute from "./routes/propertyRoute.js";
import rentRoute from "./routes/rentRoute.js";
import requestRoute from "./routes/requestRoute.js";
import User from "./models/userModel.js"; // Added this

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({

    origin: ["http://localhost:5173", "http://localhost:3000"],

    credentials: true
}));

app.use(session({
    secret: "real-estate-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));


app.get("/", (req, res) => {
    res.status(200).json({ message: "Real estate API is running" });
});



app.use("/api/users", userRouter);
app.use("/api/properties", isAuthenticated, propertyRoute);
app.use("/api/rents", isAuthenticated, rentRoute);
app.use("/api/requests", isAuthenticated, requestRoute);

async function startServer() {
    try {
        await connectDb();
        
        // This syncs the specific User model to create the table
        await User.sequelize.sync({ alter: true });
        console.log("Database synced");

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Startup error:", error);
    }
}

startServer();