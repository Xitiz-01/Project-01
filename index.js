const express = require("express");
const fs = require("fs"); 
const{logReqRes} = require("./middlewares");
const {connectMongoDb} = require("./connection");
const mongoose = require("mongoose");  
const userRouter = require('./routes/user');
const app = express();
const port = 8000;
//Connect to MongoDB
connectMongoDb('mongodb://127.0.0.1:27017/myapp1').then(() => console.log("Connected to MongoDB"));

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("log.txt"));
app.use((req,res,next) => {
    console.log("Hello from Middleware 1");
    req.myUsername = "John Doe";
    next();
});


//Routes 
app.use("/api/users", userRouter);

// app.patch("/api/users/id:", (req,res) => {
//     //To DO : Edit a user with id
//     return res.json({ status : "pending" });
// });
// app.delete("/api/users/id:", (req,res) => {
//     //To DO : Delete the user with id
//     return res.json({ status : "pending" });
// });


app.listen(port, () => console.log(`Server is running on port ${port}`));