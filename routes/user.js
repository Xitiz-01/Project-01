const express = require("express");
const{getAllUsers,getUserById, updateUsersById, deleteUsersById , createNewUser} = require("../controllers/user");
const router = express.Router();
router.route("/")
.get(getAllUsers)
.post(createNewUser);
// router.get("/users", async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//     </ul>
//     `;
//     res.send(html);
// });



router.get("/car/:car_model", (req,res) => {
    const car = (req.params.car_model);
    const user = users.find((user) => user.car_model === car);
    return res.json(user);
});

router

//grouping of routes with same path
.route("/:id")
    .get(getUserById)
.patch(updateUsersById)
.delete(deleteUsersById);

module.exports = router;