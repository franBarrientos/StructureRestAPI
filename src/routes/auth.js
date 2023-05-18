const { Router } = require("express");
const { login, googleSignIn } = require("../controllers/authController");
const { LoginValidator, googleValidator } = require("../validators/authValidator");
const router = Router();

router.post("/login", LoginValidator, login);
router.post("/google", googleValidator ,googleSignIn );

//.post("/register", createUserValidator, createUser);

module.exports = router;
