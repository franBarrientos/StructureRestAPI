const { check, validationResult } = require("express-validator");
const {
  handleError,
  handleSucces,
  existCategorie,
  mongoIdValidator,
  existProduct,
} = require("../utils");

const productValidator = [
  check("name").exists().notEmpty().isLength({ min: 1, max: 50 }),
  check("categorie").custom(existCategorie),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      handleError(res, "ERROR_PRODUCT_VALIDATOR", 500, error);
    }
  },
];

const existProductValidator = [
  check("id").isMongoId(),
  check("id").custom(existProduct),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      handleError(res, "ERROR_PRODUCT_VALIDATOR", 500, error);
    }
  },
];


module.exports = { productValidator, existProductValidator };
