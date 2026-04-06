const express = require('express');
const app = express();
const port = 3000;

// Middleware to read JSON data
app.use(express.json());

// In-memory storage for users (temporary)
let users = [];

// Home route
app.get('/', (req, res) => {
    res.send("Real Estate Management System is Running");
});

// ====================== USER REGISTRATION ======================

// Register a new user
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are filled
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,   // In real project, we should hash the password
        role: "user"
    };

    users.push(newUser);

    res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
});

// Get all users (for testing)
app.get('/users', (req, res) => {
    res.json(users);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
