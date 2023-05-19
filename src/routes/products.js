const { Router} = require("express");
const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct} = require("../controllers/productsController")
const {productValidator,JWTValidator,existProductValidator  } = require("../validators")

const router = Router();
router
    .get("/", getAllProducts)

    .get("/:id", [existProductValidator], getProduct)

    .post("/", [JWTValidator(["USER_ROLE", "ADMIN_ROLE"]), productValidator], createProduct)

    .patch("/:id", [JWTValidator(["USER_ROLE", "ADMIN_ROLE"]), existProductValidator], updateProduct)

    .delete("/:id", [JWTValidator([ "ADMIN_ROLE"]), existProductValidator], deleteProduct);

module.exports = router;
