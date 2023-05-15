const { check, validationResult } = require("express-validator");
const { handleError } = require("../utils/handlerResponse");

const userValidator = [
  check("name").exists().notEmpty().isLength({ min: 2, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 2, max: 20 }),
  async (req, res, next) => {
    try {
       validationResult(req).throw();
      next();
    } catch (error) {
      handleError(res, error, 403);
    }
  },
];

module.exports = { userValidator };
