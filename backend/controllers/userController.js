import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export async function registerUser(req, res) {
    try {
<<<<<<< HEAD
        const {username,password, email,role}=req.body;
        const findUser= await User.findOne({where:{username}})
        if(findUser) return res.status(400).json({message:"User Already exists"});
        const hashed= await bcrypt.hash(password,10)
        await User.create({username, password:hashed,email,role})

        res.status(201).json({message:"User created successfully"});
    } catch (error) {
        console.error("error Occured when registering user",error)
        res.status(500).json({error:error.message});
    }
}

export async function loginUser(req,res){
    try {
         const {username,password}=req.body;
         const user= await User.findOne({where:{username}})
         if(!user) return res.status(400).json({message:"User Doesn't exist"});
         const unhash= await bcrypt.compare(password,user.password)
         if(!unhash) return res.status(400).json({message:"Invalid password"})
            req.session.userId= user.user_id;
            res.status(200).json({message:"logged in successfully",
                user:{
                    username:user.username,
                    email:user.email,
                    role:user.role
                }});
    } catch (error) {
        console.error("Error occured when logingIn user",error);
        res.status(500).json({error:error.message})
    }
}

export async function logoutUser(req,res){

        req.session.destroy(err=>{
            if(err) return res.status(400).json({message:"Logging out failed"})
                res.status(200).json("logged out successfully")

        })

=======
        const { username, password, email, role } = req.body;
>>>>>>> d66e7ea0ba16666e78f0fcef9299a25396fa91dc
        
        // Check if user exists
        const findUser = await User.findOne({ where: { username } });
        if (findUser) return res.status(400).json({ message: "User Already exists" });
        
        // Hash password
        const hashed = await bcrypt.hash(password, 10);
        
        // Create user
        await User.create({ username, password: hashed, email, role });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error occurred when registering user:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ message: "User Doesn't exist" });
        
        const unhash = await bcrypt.compare(password, user.password);
        if (!unhash) return res.status(400).json({ message: "Invalid password" });

        // Note: Using user.id because Sequelize defaults to 'id' 
        // unless you specifically named it 'user_id' in your model
        req.session.userId = user.id || user.user_id;

        res.status(200).json({
            message: "logged in successfully",
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error occurred when logging in user:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function logoutUser(req, res) {
    req.session.destroy(err => {
        if (err) return res.status(400).json({ message: "Logging out failed" });
        
        res.clearCookie('connect.sid'); // Clears the session cookie
        res.status(200).json({ message: "logged out successfully" });
    });
}