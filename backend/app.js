import express from "express";
import cors from "cors";
import session from "express-session";
import { connectDb } from "./config/db.js";
import { isAuthenticated } from "./middleware/authMiddleware.js";
import userRouter from "./routes/userRouter.js";
import propertyRoute from "./routes/propertyRoute.js";
import rentRoute from "./routes/rentRoute.js";
import requestRoute from "./routes/requestRoute.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET || "real-estate-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Real estate API is running" });
});

app.use("/api/users", userRouter);
app.use("/api/properties",propertyRoute);
app.use("/api/rents", rentRoute);
app.use("/api/requests",requestRoute);

async function startServer() {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();
