const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    order_id:{
        type:String,
        required:true,
    },
    payment_id:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    products:[{
        id:{
            type:String,
            require:true,
        },
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
        imageId:{
            type:String,
        },
        defaultPrice:{
            type:Number,
        }
    }],


})

const paymentModel = mongoose.model("payment",PaymentSchema);
module.exports = paymentModel;

