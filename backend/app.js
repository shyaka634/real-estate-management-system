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
<<<<<<< HEAD
    origin: "http://localhost:5173",
=======
    origin: ["http://localhost:5173", "http://localhost:3000"],
>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc
    credentials: true
}));

app.use(session({
    secret: "real-estate-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

<<<<<<< HEAD
app.get("/", (req, res) => {
    res.status(200).json({ message: "Real estate API is running" });
});
=======
function isAuthenticated(req, res, next) {
    if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });
    next();
}
>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc

app.use("/api/users", userRouter);
app.use("/api/properties",propertyRoute);
app.use("/api/rents", rentRoute);
app.use("/api/requests",requestRoute);

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