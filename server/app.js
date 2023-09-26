require("dotenv").config()
const express = require("express");
const User = require("./model/userSchema.js")
const app = express()



app.get("/",(req,res)=>{
    res.send("<h1>Welcome !!</h1>");
})

app.post("/signup", async(req,res)=>{
    const {firstname,lastname,email,password} = req.body
    if(!(email && password && firstname && lastname)){
             res.status(400).send("All the Field are Required")
    }
  
    const extuser = await User.findOne(email)
  if(extuser){
    res.status(400).send("User Already Exit")
  }
  
  


})

module.exports = app;