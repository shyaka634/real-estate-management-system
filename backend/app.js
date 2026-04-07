import express from "express";
import cors from "cors";
import session from "express-session";
import { connectDb } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import propertyRoute from "./routes/propertyRoute.js";
import rentRoute from "./routes/rentRoute.js";
import requestRoute from "./routes/requestRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
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

function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized. Please login first." });
    }
    next();
}

app.get("/", (req, res) => {
    res.status(200).json({ message: "Real estate API is running" });
});

app.use("/api/users", userRouter);
app.use("/api/properties", isAuthenticated, propertyRoute);
app.use("/api/rents", isAuthenticated, rentRoute);
app.use("/api/requests", isAuthenticated, requestRoute);

async function startServer() {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();
