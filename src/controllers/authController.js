const UserModel = require("../models/user");
const { compare } = require("../utils/handleHashPassword");
const { handleError, handleSucces } = require("../utils/handlerResponse");
const { tokenSign } = require("../utils/handleJWT");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");
    if (!(await compare(password, user.password)))
      throw new Error("Password Incorrect");
    if (!user.state) throw new Error("False State");
    const token = tokenSign(user.id, user.role) 
    handleSucces(res, { user, token });
  } catch (error) {
    handleError(res, "ERROR_LOGIN", 403, error);
  }
};

module.exports = { login };
