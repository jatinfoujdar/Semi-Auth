require("./config/db").connect();
require("dotenv").config()
const express = require("express");
const jwt = require("jsonwebtoken")
const User = require("./model/userSchema.js")
const app = express()

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("<h1>Welcome !!</h1>");
})
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/signup", async(req,res)=>{
    const {firstname,lastname,email,password} = req.body
    if(!(email && password && firstname && lastname)){
             res.status(401).send("All the Field are Required")
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

     const extuser = await User.findOne({email})
     if(extuser){
     res.status(400).send("User Already Exit")
     }
     
    const myEncyPassword =  await bcrypt.hash(password,10)
     
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: myEncyPassword
    })

    const token = jwt.sign({
      id: user._id, email
    },"shhhhh", {expiresIn: "2h"})

    user.token = token
    user.password = undefined

})

module.exports = app;