const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'real_estate'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

app.post('/register', (req, res) => {
    const { user_id, name, email, password, role, phone } = req.body;
    console.log('Received data:', req.body);
    
    const sql = 'INSERT INTO users(user_id,name,email,password,role,phone) VALUES(?,?,?,?,?,?,?)';
    db.query(sql, [user_id, name, email, password, role, phone], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
        } else {
            console.log('Data inserted successfully');
        }
    });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ error: 'Error during login' });
        } else {
            if (result.length > 0) {
                res.json({ message: 'Login successful', user: result[0] });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        }
    });
});
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            res.json(result);
        }
    });
});


app.post('/properties', (req, res) => {
    const { property_id, title, description, price, location, property_type, status, agent_id, created_at } = req.body;
    const sql = 'INSERT INTO properties(property_id,title,description,price,location,property_type,status,agent_id,created_at) VALUES(?,?,?,?,?,?,?,?,?)';
    db.query(sql, [property_id, title, description, price, location, property_type, status, agent_id, created_at], (err, result) => {
        if (err) {
            console.error('Error inserting property:', err);
            res.status(500).json({ error: 'Error inserting property' });
        } else {
            console.log('Property inserted successfully');
            res.status(201).json({ message: 'Property inserted successfully', id: result.insertId });
        }
    });
});
app.get('/properties', (req, res) => {
    const sql='SELECT * FROM properties';
    db.query(sql,(err,result)=>{
        if(err){
            console.error('Error fetching properties:', err);
            res,status(500).json({ error: 'Error fetching properties'});
        }else{
            console.log('Properties fetched successfully');
            res.json(result);
        }
        });
    });
app.post('/bookings', (req,res)=>{
const {booking_id,user_id,property_id,visit_date,status}=req.body;
const sql='INSERT INTO bookings(booking_id,user_id,property_id,visit_daate,status) VALUES(?,?,?,?,?)';
db.query(sql,[booking_id,property_id,user_id,visit_date,status], (err,result)=>{
    if(err){
        console.error('Booking failed:', err)
    res.status(500).json({error:'Booking failed'});
    }else{
        console.log('Booked successfully');
        res.status(201).json({message: 'Booked successfully', id:result.insertId});
    }
})
});
app.get('/bookings', (req,res)=>{
    const sql= 'SELECT * FROM bookings';
    db.query(sql,(err,result)=>{
        if(err){
            console.error('Error fetching bookings:', err);
        }else{
            console.log('Bookings fetched successfully');
        }
    })
});

app.post('/reviews', (req,res)=>{
    const {review_id,user_id,property_id,rating,comment}=req.body;
    const sql='INSERT INTO reviews(review_id,user_id,property_id,rating,comment) VALUES(?,?,?,?,?)';
    db.query(sql,[review_id,user_id,property_id,rating,comment],(err,result)=>{
        if(err){
            console.error('Error submitting review:', err);
            res.status(500).json({error:'Error submitting review'});
        }else{
            console.log('Review submitted successfully');
            res.status(201).json({message:'Review submitted successfully', id:result.insertId});
        }
    });
});
app.get('/reviews',(req,res)=>{
    const sql='SELECT * FROM reviews';
    db.query(sql,(err,result)=>{
        if(err){
            console.error('Error fetching reviews:', err);
            res.status(500).json({ error: 'Error fetching reviews' });
        }else{
            console.log('Reviews fetched successfully');
            res.json(result);
        }
    });
});

app.post('/transactions', (req,res)=>{
    const {transaction_id,property_id,buyer_id,amount,transaction_type,payment_status,created_at}=req.body;
    const sql='INSERT INTO transactions(transaction_id,property_id,buyer_id,amount,transaction_type,payment_status,created_at) VALUES(?,?,?,?,?,?,?)';
    db.query(sql,[transaction_id,property_id,buyer_id,amount,transaction_type,payment_status,created_at],(err,reslut)=>{
        if(err){
            console.error('Error submitting transaction:',err);
            res.status(500).json({error:'Error submitting transaction'});
        }else{
            console.log('Transaction accepted');
            res.json(result);
        }
    });
});

app.get('/transactions',(req,res)=>{
    const sql= 'SELECT * FROM transactions';
    db.query(sql,(err,result)=>{
        if(err){
            console.error('Error fetching transactions:', err);
            res.status(500).json({ error: 'Error fetching transactions'});
        }else{
            console.log('Transactions fetched successfully');
            res.json(result);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
