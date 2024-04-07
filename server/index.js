const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const user = require('./models/user')
const paymentRoutes = require("./routes/paymentRoute");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const app = express()
app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin:"*",
    credentials:true,
}));
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Server running......."
    })
})

app.use('/api/v2',require('./routes/authRoute'))
app.use('/api/v2',paymentRoutes);
app.use('/api/v2',productRoutes);
mongoose.connect(process.env.MOGODB)
        .then(()=>console.log("Database Connected"))
        .catch((error)=>console.log("data base not connected",error))

const start = async()=>{
    try{
    
        app.listen(8000,()=>console.log('I am listening..'))
    }
    catch(error){
        console.log(error);
    }
}
start()