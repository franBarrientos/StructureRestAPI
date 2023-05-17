const RoleModel = require("../models/role");
const UserModel = require("../models/user");
const roleValidator = async (role = "") => {
  const existRole = await RoleModel.findOne({ role });
  if (!existRole) throw new Error("ROLE_INVALIDATE");
};

const mongoIdValidator = async (id = "") => {
    const existID = await UserModel.findById(id);
    if(!existID) throw new Error("ID_INVALIDATE");
};

module.exports = { roleValidator, mongoIdValidator };
