const RoleModel = require("../models/role");
const UserModel = require("../models/user");
const CategorieModel = require("../models/categorie")
const roleValidator = async (role = "") => {
  const existRole = await RoleModel.findOne({ role });
  if (!existRole) throw new Error("ROLE_INVALIDATE");
};

const mongoIdValidator = async (id = "") => {
    const existID = await UserModel.findById(id);
    if(!existID) throw new Error("ID_INVALIDATE");
};

const existCategorie = async (id = "")=>{
  const categorie = await CategorieModel.findById(id);
  if(!categorie) throw new Error("CATEGORIE_ID_INVALIDATE")
}

module.exports = { roleValidator, mongoIdValidator, existCategorie };
