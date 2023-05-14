const { handleSucces, handleError } = require("./../utils/handlerResponse");

const getUsers = (req, res) => {
  handleSucces(res, "getttt xd");
};

const getUser = (req, res) => {
  handleSucces(res, "getttt ONly one xd");
};

const createUser = (req, res) => {
  console.log(req.body) 
  handleSucces(res, "gettppptt xd");
};

const updateUser = (req, res) => {
  handleSucces(res, "patch xd");
};

const deleteUser = (req, res) => {
  handleSucces(res, "delete");
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
