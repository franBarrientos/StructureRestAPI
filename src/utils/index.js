const handleHashPassword = require("../utils/handleHashPassword");
const handleJWT = require("../utils/handleJWT");
const handleValidators = require("../utils/handleValidators");
const handlerResponse = require("../utils/handlerResponse");
const handlerGoogle = require("../utils/handleGoogle");

module.exports = {
    ...handleHashPassword,
    ...handleJWT,
    ...handleValidators,
    ...handlerResponse,
    ...handlerGoogle
}