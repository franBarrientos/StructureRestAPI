const { Router} = require("express");
const {getAllCategorie, getCategorie, createCategorie, updateCategorie, deleteCategorie } = require("../controllers/categorieController");
const { JWTValidator, checkCategorieExist, CategorieValidator} = require("../validators")
const router = Router();

router
    .get("/", getAllCategorie)

    .get("/:id", [checkCategorieExist], getCategorie)

    .post("/", [JWTValidator(["USER_ROLE", "ADMIN_ROLE"]), CategorieValidator], createCategorie)

    .patch("/:id", [JWTValidator(["USER_ROLE", "ADMIN_ROLE"]), checkCategorieExist, CategorieValidator], updateCategorie)

    .delete("/:id", [JWTValidator([ "ADMIN_ROLE"]), checkCategorieExist], deleteCategorie)

module.exports = router;