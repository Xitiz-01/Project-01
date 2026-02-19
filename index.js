const express = require("express");
const fs = require("fs"); 
const users = require("./MOCK_DATA.json");
const app = express();
const port = 8000;
//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use((req,res,next) => {
    console.log("Hello from Middleware 1");
    next();
});
//Routes 
app.get("/api/users",(req,res) => {
    return res.json(users);
})
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});



app.get("/api/users/car/:car_model", (req,res) => {
    const car = (req.params.car_model);
    const user = users.find((user) => user.car_model === car);
    return res.json(user);
})

app.post("/api/users", (req,res) => {
    //To DO : Create a new user
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
    return res.json({ status : "success", id: users.length});
    });
});
app

//grouping of routes with same path
.route("/api/users/:id")
    .get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req,res) => {
    const body = req.body;
    const id = Number(req.params.id);
    const userindex = users.findIndex((user) => user.id === id);
        users[userindex] = {...users[userindex], ...body};
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
            return res.json({ status : "success", id: users[userindex].id});
        });
})

.delete((req,res) => {
    //To DO : Delete the user with id
    const body = req.body;
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    const deletedUser = users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({ status : "success", id: deletedUser[0].id});
});
})
// app.patch("/api/users/id:", (req,res) => {
//     //To DO : Edit a user with id
//     return res.json({ status : "pending" });
// });
// app.delete("/api/users/id:", (req,res) => {
//     //To DO : Delete the user with id
//     return res.json({ status : "pending" });
// });


app.listen(port, () => console.log(`Server is running on port ${port}`));