const { Router } = require("express");
const { login } = require("../controllers/authController");
const { LoginValidator } = require("../validators/authValidator");
const router = Router();

router.post("/login", LoginValidator, login);

//.post("/register", createUserValidator, createUser);

module.exports = router;
