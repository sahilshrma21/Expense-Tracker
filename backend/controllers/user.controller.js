import bcrypt from 'bcryptjs';
import {user} from '../models/user.model.js';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { fullname, email , password} = req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({
                message:"All fields are required!",
                success:false
            })
        };

        const User = await user.findOne({email});
        if(User){
            return res.status(400).json({
                message:"User already exists!",
                success:false
            })
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            fullname,
            email,
            password:hashedPassword
        });

        return res.status(201).json({
            message:"User registered successfully!",
            success:true,
            data:newUser
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required!",
                success:false
            })
        };
        const User = await user.findOne({email});
        if(!User){
            return res.status(400).json({
                message:"Incorrect email or password!",
                success:false
            })
        };
        const isPasswordCorrect = await bcrypt.compare(password, User.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Incorrect email or password!",
                success:false
            })
        };

        const tokenData = {
            userId:User._id,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${User.fullname}!`,
            user:{
                _id : User._id,
                fullname : User.fullname,
                email : User.email,
            },
            success : true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully!",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}