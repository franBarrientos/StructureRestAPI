const UserModel = require("../models/user");
const { handleSucces, handleError } = require("../utils/handlerResponse");
const { encrypt, compare } = require("../utils/handleHashPassword");

const getUsers = async (req, res) => {
  try {
    const { limit = 5, from = 0 } = req.query;
    const [allUsers, total] = await Promise.all([
      UserModel.find({ state: true }).skip(Number(from)).limit(Number(limit)),
      UserModel.countDocuments({ state: true }),
    ]);
    handleSucces(res, { users: allUsers, total });
  } catch (error) {
    handleError(res, "ERROR_GET_USERS", 500, error);
  }
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
    const { _id, password, google, ...userWithoutPassword } = req.body;

    if (password) userWithoutPassword.password = await encrypt(password);
    const user = await UserModel.findByIdAndUpdate(id, userWithoutPassword, {
      new: true,
    });
    // Add { new: true } for return the updated object instead of the old
    handleSucces(res, user);
  } catch (error) {
    handleError(res, "UPDATE_ERROR", 500, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("The administrator is ", req.administrator);
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, {state:false}, {
      new: true,
    });
    handleSucces(res, {user, administrator:req.administrator});
  } catch (error) {
    handleError(res, "DELETE_ERROR", 500, error);
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
