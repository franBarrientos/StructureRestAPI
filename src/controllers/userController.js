const UserModel = require("../models/user");
const { handleSucces, handleError } = require("../utils/handlerResponse");
const { encrypt, compare } = require("../utils/handleHashPassword");

const getUsers = (req, res) => {
  handleSucces(res, "getttt xd");
};

const getUser = (req, res) => {
  req.params;
  handleSucces(res, req.params.id);
};

const createUser = async (req, res) => {
  try {
    const userNew = new UserModel(req.body);
    userNew.password = await encrypt(userNew.password);
    await userNew.save();
    handleSucces(res, userNew);
  } catch (error) {
    handleError(res, "REGISTER_ERROR", 500, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, google, ...userWithoutPassword } = req.body;
    
    if( password ) userWithoutPassword.password = await encrypt(password);
    const user = await UserModel.findByIdAndUpdate(id, userWithoutPassword, { new: true });
    // Add { new: true } for return the updated object instead of the old
    handleSucces(res, user);
  } catch (error) {
    handleError(res, "UPDATE_ERROR", 500, error);
  }
};

const deleteUser = (req, res) => {
  handleSucces(res, "delete");
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
