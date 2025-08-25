const express = require('express')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userSchema')

const generateToken = (res,id) => {
    const token = jwt.sign({id},process.env.JWT_KEY,{expiresIn:'10d'})
    res.cookie('token',token,{
        httpOnly:true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 10 * 24 * 60 * 60 * 1000
    })
}

const loginUser = async (req,res) => {
    try {const {email,password} = req.body;
    const user = await User.findOne({email})

    if(!user||!(await bcrypt.compare(password,user.password))) return res.status(401).json("Invalid User Credentials!")

    generateToken(res,user._id)
    res.status(200).json({_id:user._id,email:user.email})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

const registerUser = async (req,res) =>{
  try  { const {email,password} = req.body
    const user = await User.findOne({email})
    if(user) return res.status(400).json({error:"User Already Exists!"})

    const salt = await bcrypt.genSalt(10)
    const passHash = await bcrypt.hash(password,salt) 
    
    const newuser = await User.create({email,password:passHash})

    if(newuser){
        generateToken(res,newuser._id)
        return res.status(201).json({_id:newuser._id,email:newuser.email})
    }
    return res.status(400).json({error:"Failed to Create User"})}
    
    catch(err){
        return res.status(500).json({error:err.message})
    }

}

const logoutUser =async (req,res) => {

    res.cookie('token', '', {
    httpOnly: true, secure: false, sameSite: 'Lax', path: '/', expires: new Date(0)
    });
    return res.status(200).json({message:"Logged Out successfully"})
}

const me = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(200).json({ loggedIn: false });
  try {
    const {id}  = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(id).select('_id email');
    if (!user) return res.status(200).json({ loggedIn: false });
    return res.status(200).json({ loggedIn: true, user });
  } catch {
    return res.status(200).json({ loggedIn: false });
  }
};


module.exports = {loginUser,registerUser,logoutUser,me}

