const handleHashPassword = require("../utils/handleHashPassword");
const handleJWT = require("../utils/handleJWT");
const handleValidators = require("../utils/handleValidators");
const handlerResponse = require("../utils/handlerResponse");

module.exports = {
    ...handleHashPassword,
    ...handleJWT,
    ...handleValidators,
    ...handlerResponse
}