import { Message } from "../models/messageSchema.js";
import bcrypt from "bcrypt";
// const bcrypt = require('bcrypt');
import {UserModel} from "../database/User.js";
import jwt from "jsonwebtoken";
// import jwt from 'jsonwebtoken';

// const { sign, verify } = jwt;
export const sendMessage = async(req,res)=>{
    try {
        const {name, email, subject, message} = req.body;
        if(!name || !email|| !subject || !message){
            return res.status(400).json({
                success:false,
                message: "All fields are required..",
            });
        }
        await Message.create({name, email, subject, message});
        res.status(200).json({
            success: true,
            message: "Message Sent Successfully..",
        });
    } catch (error) {
        if(error.name === "ValidationError"){
            let errorMessage = "";
            if(error.errors.name){
                errorMessage += error.errors.name.message + " ";
            }
            if(error.errors.email){
                errorMessage += error.errors.email.message + " ";
            }
            if(error.errors.subject){
                errorMessage += error.errors.subject.message + " ";
            }
            if(error.errors.message){
                errorMessage += error.errors.message.message + " ";
            }
        
            return res.status(200).json({
                success:false,
                message: errorMessage,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unknown Error",
        });
    }
};


export const signup = async(req,res)=>{
    try {
        const {fname, lname, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return req.status(409)
                .json({message: 'User already exist, please login', success: false })
        }
        const userModel = new UserModel({fname, lname, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (error) {
       res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
};

export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg = "Authentication failed. Email or Password is wrong";
        if(!user){
            return req.status(403)
                .json({message:errorMsg , success: false })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return req.status(403)
                .json({message:errorMsg , success: false })
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );
        res.status(200)
            .json({
                message: "Login successfully",
                success: true,
                jwtToken,
                email, 
                name: user.fname
            })
    } catch (error) {
       res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
};