const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 8000;
//Routes 
app.get("/users",(req,res) => {
    return res.json(users);
})
app.listen(port, () => console.log(`Server is running on port ${port}`));