const { Router} = require("express");
const {getAllCategorie, getCategorie, createCategorie, updateCategorie, deleteCategorie } = require("../controllers/categorieController");
const { JWTValidator, checkCategorieExist, CategorieValidator} = require("../validators")
const router = Router();

router
    .get("/", getAllCategorie)

    .get("/:id", [checkCategorieExist], getCategorie)

    .post("/", [JWTValidator, CategorieValidator], createCategorie)

    .patch("/:id", [JWTValidator, checkCategorieExist, CategorieValidator], updateCategorie)

    .delete("/:id", [], deleteCategorie)

module.exports = router;