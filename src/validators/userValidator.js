const { check, validationResult } = require("express-validator");
const { handleError, roleValidator, mongoIdValidator, verifyToken} = require("../utils")
const UserModel = require("../models/user")


const createUserValidator = [
  check("name").exists().notEmpty().isLength({ min: 2, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 2, max: 20 }),
  check("role").custom(roleValidator),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      handleError(res, "ERROR_VALIDATOR_CREATE", 403, error);
    }
  },
];

const idUserValidator = [
  check("id").isMongoId(),
  check("id").custom(mongoIdValidator),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      handleError(res, "ERROR_ID_NOT_EXIST", 403, error);
    }
  },
];

const JWTValidator = (roles)=>async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw new Error("Not Exist Token");
    const { id, role } = verifyToken(authorization.split(" ").pop());
//    if (role != "ADMIN_ROLE") throw new Error("Not Authorizate");
    haveRol(roles, role);
    const administrator = await UserModel.findOne({_id:id})
    if(!administrator) throw new Error("Administrator Not Found");
    if(!administrator.state) throw new Error("False State");
    req.administrator = administrator;
    next();
  } catch (error) {
    handleError(res, "ERROR_JWT", 401, error);
  }
};

const haveRol = ( roles = [], rolUser)=>{
  if (!roles.includes(rolUser)) throw new Error("Not Authorizate, Only Admins can delete users!");
} 

module.exports = { createUserValidator, idUserValidator, JWTValidator };
