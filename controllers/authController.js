import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"All Fields are required.",
            });
        }
        
        const existsUser = await User.findOne({email});

        if(existsUser){
            return res.status(400).json({
                message:"User Already Exists."
            })
        }

        //Hashing
        const salt = bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        //Creating User
        const user = await User.create({
            name,email,password:hashedPassword
        });

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            message:"User Created Successfully";
        });
    }catch(error){
        res.ststus(500).json({
            message:error.message
        });
    }
};