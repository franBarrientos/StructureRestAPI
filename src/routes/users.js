const { Router } = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { userValidator } = require("../validators/userValidator");
const router = Router();

router
  .get("/", getUsers)

  .get("/:id", getUser)

  .post("/", userValidator, createUser)

  .patch("/:id", updateUser)

  .delete("/:id", deleteUser);

module.exports = router;
