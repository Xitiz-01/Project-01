const mongoose = require("mongoose");  
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: false
    },    
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : {
        type: String,
        required: true
    },
    car_model : {
        type: String,
        required: true
    },
},
    {timestamps:true
});
const User = mongoose.model("User", userSchema);
module.exports = User;