const express = require("express");
const fs = require("fs"); 
const mongoose = require("mongoose");  
const app = express();
const port = 8000;
//Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myapp1')
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB:", err));
//Schema
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

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use((req,res,next) => {
    console.log("Hello from Middleware 1");
    req.myUsername = "John Doe";
    next();
});
app.use((req,res,next) => {
    fs.appendFile("log.text",`\n  ${Date.now()}: ${req.ip}: ${req.method} : ${req.path}\n`, (err,data) => {
    next();
});
});
//Routes 
app.get("/api/users",async (req,res) => {
    const allDbUsers = await User.find({});
    res.setHeader("X-MyName", "Kshitij Londhe"); 
    //Always add X before custom headers to avoid conflicts with standard headers
    console.log(req.headers);
    return res.json(allDbUsers);
})
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});



app.get("/api/users/car/:car_model", (req,res) => {
    const car = (req.params.car_model);
    const user = users.find((user) => user.car_model === car);
    return res.json(user);
})

app.post("/api/users", async (req,res) => {
    //To DO : Create a new user
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
console.log("result",result);
return res.status(201).json({ status : "success"})
});
app

//grouping of routes with same path
.route("/api/users/:id")
    .get(async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({ status : "failure", message: "User not found"});  
    }
    return res.json(user);
})
.patch(async (req,res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName : "Changed"});
})

.delete(async(req,res) => {
    //To DO : Delete the user with id
    await User.findByIdAndDelete(req.params.id);
        return res.json({ status : "success"});
});

// app.patch("/api/users/id:", (req,res) => {
//     //To DO : Edit a user with id
//     return res.json({ status : "pending" });
// });
// app.delete("/api/users/id:", (req,res) => {
//     //To DO : Delete the user with id
//     return res.json({ status : "pending" });
// });


app.listen(port, () => console.log(`Server is running on port ${port}`));