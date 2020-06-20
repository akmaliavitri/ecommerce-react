const router = require("express").Router();

const userController = require("../controllers/user.controllers");
const { authentication } = require("../middlewares/authentication");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

router.use(authentication);
router.get("/", userController.getUser);

module.exports = router;
