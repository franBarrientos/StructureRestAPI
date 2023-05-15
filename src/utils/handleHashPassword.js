const bcrypt = require("bcryptjs");
/**
 * Function which receives a PasswordPlain and return this but Hashed

 * @param {String} PasswordPlain
 * @returns Password Hash
 */
const encrypt = async (textPlain) => {
  return await bcrypt.hash(textPlain, 10);
};

/**
 * Function which receives a PasswordPlain and a hashPasswordm , then return the match
 * @param {*} passwordPlano
 * @param {*} hashPassword
 * @returns Boolean True or False
 */
const compare = async (textPlain, hashPassword) => {
  return await bcrypt.compare(textPlain, hashPassword);
};

module.exports = { encrypt, compare };
