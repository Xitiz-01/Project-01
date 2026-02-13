const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 8000;
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
    //To DO : Create a new usr
    return res.json({ status : "pending" });
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
    //To DO : Edit a user with id
    return res.json({ status : "pending" });
})
.delete((req,res) => {
    //To DO : Delete the user with id
    return res.json({ status : "pending" });
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