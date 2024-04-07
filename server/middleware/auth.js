
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
exports.verifyToken = async(req,res,next)=>{
    try {
        let token = req.cookies.token || req.body.token || req.headers["authorization"];
        
  
        // console.log("TOKENNN auth controller",tk);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Missing",
            });
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        try {
            console.log("JWT SECRET",process.env.JWT_SECRET)
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("DECODE",decode);
            req.user=decode;
            next();
        } catch (error) {
            console.log("AUthenticaiton error",error);
             

            return res.status(401).json({
                success:false,
                message:"TOKen is invalid"
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Error occured while validating token"
        })
    }
}

