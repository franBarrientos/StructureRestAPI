const { Router } = require("express");
const { getUsers, getUser, createUser, updateUser, deleteUser} = require("../controllers/usersController")
const router = Router();

router
  .get("/", getUsers)

  .get("/:id", getUser)
  
  .post("/", createUser)

  .patch("/:id",updateUser )

  .delete("/:id",deleteUser );

module.exports = router;
