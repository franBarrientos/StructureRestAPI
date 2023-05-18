const authValidator = require("../validators/authValidator");
const userValidator = require("../validators/userValidator");
const categorieValidator = require("../validators/categorieValidator")
module.exports = {
  ...authValidator,
  ...userValidator,
  ...categorieValidator
};
