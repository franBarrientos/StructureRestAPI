const { Router } = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  createUserValidator,
  idUserValidator,
  JWTValidator
} = require("../validators/userValidator");
const router = Router();

router
  .get("/", getUsers)

  .get("/:id", getUser)

  .post("/", createUserValidator, createUser)

  .patch("/:id", idUserValidator, updateUser)

  .delete("/:id", [ JWTValidator, idUserValidator], deleteUser);

module.exports = router;
