const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
        max: 20
    },
    lastname: {
        type: String,
        default: null,
        max:20
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    token:{
        type: String
    }
})


module.exports = mongoose.model("user",userSchema);