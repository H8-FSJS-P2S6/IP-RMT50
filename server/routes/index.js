const router = require("express").Router();
const {
  login,
  register,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  geminiAI,
} = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");
const { checkAdmin } = require("../middlewares/authorization");

const cRoute = require("./characters");
const vRoute = require("./village");

router.post("/login", login);
router.post("/register", register);
router.post("/gemini", geminiAI);

router.use(authentication);

router.get("/users", getUser);
router.post("/users", checkAdmin, createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", checkAdmin, deleteUser);

router.use(cRoute);
router.use(vRoute);

module.exports = router;
