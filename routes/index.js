const router = require("express").Router();
const { login, register, updateUser, createUser, deleteUser } = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");
const { checkAdmin } = require("../middlewares/authorization");




router.post("/login", login);
router.post("/register", register);

router.use(authentication);
router.post("/users", checkAdmin, createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", checkAdmin, deleteUser);

module.exports = router;
