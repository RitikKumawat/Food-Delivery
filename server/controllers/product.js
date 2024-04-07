const Payment = require("../models/Payment");
const User = require("../models/user")

const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.recentOrder = async(req,res)=>{
    
    try {
      
        const userId = req.user.id;
        // const email = req.user.email;
        // const user = await User.findOne({email});
        // const userId = req.user.id;
        console.log("USERID PRODUCT CONTROLLER",userId);
        const orders = await Payment.find({user:userId,})
        
        return res.status(200).json({
            success:true,
            data:orders,
        })
    } catch (error) {
      console.log("ERROR Product controller,",error);
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })  
    }
}