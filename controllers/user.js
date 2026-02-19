const { model } = require("mongoose");
const User = require("../models/user");
async function getAllUsers(req, res){
const allDbUsers = await User.find({});
    return res.json(allDbUsers);
} 

async function getUserById(req,res){
     const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({ status : "failure", message: "User not found"});  
    }
    return res.json(user);
}

async function updateUsersById(req, res){
      await User.findByIdAndUpdate(req.params.id, { lastName : "Changed"});
}
async function deleteUsersById(req, res){
      await User.findByIdAndDelete(req.params.id);
        return res.json({ status : "success"});
}
async function createNewUser(req, res){
const body = req.body;
    if(!body.first_name || !body.last_name || !body.email) {
        return res.status(400).json({ status : "failure", message: "All fields  are required"});
    }  
   const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        car_model : body.car_model
    });
    return res.status(201).json({ status : "success", id : result._id});
}
        module.exports = {
    getAllUsers,
    getUserById,
    updateUsersById,
    deleteUsersById,
    createNewUser
};