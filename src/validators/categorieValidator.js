const { check, validationResult} = require("express-validator")
const { handleError, existCategorie} = require("../utils");

const checkCategorieExist = [ 
    check("id").exists().isMongoId(),
    check("id").custom(existCategorie),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            handleError(res, "ERROR_CATEGORIA_DOES_NOT_EXIST", 404, error)
        }
    }
]

const CategorieValidator = [
    check("name").exists().notEmpty().isLength({min:5,max:50}),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            handleError(res, "ERROR_NAME_CATEGORIA_INVALID", 500, error)
        }
    }
]

module.exports = { checkCategorieExist, CategorieValidator}