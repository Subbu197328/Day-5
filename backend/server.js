//importing module
const express=require('express')
const bcrypt=require('bcryptjs')
const app=express()

const PORT=5000
const mongoose=require('mongoose')
require('dotenv').config()

const cors = require("cors")
const User=require('./models/User')

app.use(cors())                                //use cors middleware
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(
    () => console.log('MongoDB Connected')
).catch(
    err => console.log(err)
)

app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body            //data sending to db
    try{
        const hashedPassword=await bcrypt.hash(password,10)  
        const user=new User({username,email,password:hashedPassword})
        await user.save()
        res.json({message: "user register"})
        console.log("user registeration is completed......")
    }
    catch(err){
        console.log(err)
    }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user =await User.findOne({email})
        if(!user || !(await bcrypt.compare(password,user.password)))
            {
                return res.status(400).json({message: "invalid credentials"})
            }
            res.json({message:"Login successful",username:user.username}) 
    }
    catch(err){
        console.log(err)
    }
})

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("server is running on port "+PORT)
})