
const {default:mongoose} = require("mongoose");
const crypto = require("crypto");
const payment = require("../models/Payment");
const { instance } = require("../config/razorpay");
const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.capturePayment = async(req,res)=>{
    
    const {price} = req.body;
    
    const userId = req.user.id;
    console.log("USer id", userId);
    const options={
        amount:price*100,
        currency:'INR',
        receipt:Math.random(Date.now()).toString(),
    }
    try {
        const paymentResponse = await instance.orders.create(options);
        console.log("Payment Response backend controller,,,",paymentResponse);
        return res.json({
            success:true,
            data:{paymentResponse,userId},
        })
    } catch (error) {
        console.log("Error backend controller payment:",error);
        return res.status(500).json({
            success:false,
            message:"Could not initiate order",
        })
    }
}

exports.verifyPayment = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const product = req.body?.item;
    // console.log("PRODUCT>>>>>>",product);
    const user = req.user;
    console.log("USERRRR,,",user);
    const price = req.body?.price;
    console.log("order id..",razorpay_order_id);
    console.log("payment id..",razorpay_payment_id);
    console.log("signature..",razorpay_signature);
    console.log("price..",price);
    // console.log("userid..",userId);
    // product.map((prd)=>(
    //     console.log("NAMMEEEEEE>>>>>>",prd.card.info?.name)
    // ))
    let body = razorpay_order_id+ "|" + razorpay_payment_id;;
    const expectedSignature = crypto.createHmac("sha256",'hv8FMSQfUbknaWHzD86jGrfE')
    .update(body.toString())
    .digest("hex");
    
    if(expectedSignature === razorpay_signature){
        
        
        try {
            const products=[];
            for(const itemDetail of product){
                const prd = {
                    id:itemDetail.card.info?.id,
                    name:itemDetail.card.info?.name,
                    description:itemDetail.card.info?.description,
                    imageId:itemDetail.card.info?.imageId,
                    defaultPrice:itemDetail.card.info?.price/100
                }
                products.push(prd);
            }
            // console.log("PRoducts...",products);
            const Payment = new payment({
                order_id:razorpay_order_id,
                payment_id:razorpay_payment_id,
                price:price,
                user:user.id,
                products:products,
            });
            await Payment.save();
            await User.findByIdAndUpdate(user.id,{$push:{payments:Payment._id}})
            return res.status(200).json({
                success:true,
                message:"Payment Verified and saved"
            });
        } catch (error) {
            console.log("ERROR::::",error);
        }
        
    }

    
    return res.status(500).json({
        success:false,
        message:"Something happened",
    })
}