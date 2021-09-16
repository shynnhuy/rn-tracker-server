const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const router = Router();

router.post("/signup", authController.SignUp);
router.post("/signin", authController.SignIn);

module.exports = router;
