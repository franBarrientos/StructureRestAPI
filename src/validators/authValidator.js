const { check, validationResult } = require("express-validator");
const { handleError } = require("../utils/handlerResponse");

const LoginValidator = [
  check("email").exists().isEmail(),
  check("password").exists().notEmpty(),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      handleError(res, "ERROR_LOGIN", 403, error);
    }
  },
];

const googleValidator = [
  check("id_token").exists().notEmpty(),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      handleError(res, "ERROR_GOOGLE", 403, error);
    }
  },
]
module.exports = { LoginValidator, googleValidator };
