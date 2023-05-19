const authValidator = require("../validators/authValidator");
const userValidator = require("../validators/userValidator");
const categorieValidator = require("../validators/categorieValidator");
const productValidator = require("../validators/productValidator");
module.exports = {
  ...authValidator,
  ...userValidator,
  ...categorieValidator,
  ...productValidator
};
