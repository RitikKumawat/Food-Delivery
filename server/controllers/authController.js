const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//for testing the api available on 'api/v1/'
require("dotenv").config();
const test = (req, res) => {
  res.json("test is doing perfectly fine");
};

//to registere the user 
const registerUser = async (req, res) => {
  try {
    const { uname, email, password } = req.body;

    console.log(req.body);
    //if name was entered

    if (!uname) {
      return res.json({
        error: "name is required",
      });
    }
    //if password was entered

    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be atleast 6 character long",
      });
    }

    const exist = await User.findOne({ email });
    //if email already exists
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
      uname,
      email,
      password: hashedPassword,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

//for login credentials
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        err: "no user found",
      });
    }

    //check if password match
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const payload = {
        email:user.email,
        id:user._id
      }
      const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'24h'});
      user.token = token;
      user.password = undefined;
      
      const options = {
        expires: new Date(Date.now()+ 3*24*60*60*1000),
        httpOnly:true,
      }
      res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:"Logged in Successfully",
      })
    }
     if (!match) {
      return res.status(400).json({
        message: "Invalid Credentials check email and password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Something went wrong",
    })
  }
};







module.exports = { test, registerUser, loginUser};