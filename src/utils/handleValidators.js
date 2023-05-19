const RoleModel = require("../models/role");
const UserModel = require("../models/user");
const CategorieModel = require("../models/categorie");
const ProductModel = require("../models/product");

const roleValidator = async (role = "") => {
  const existRole = await RoleModel.findOne({ role });
  if (!existRole) throw new Error("ROLE_INVALIDATE");
};

const mongoIdValidator = async (id = "") => {
  const existID = await UserModel.findById(id);
  if (!existID) throw new Error("ID_INVALIDATE");
};

const existCategorie = async (id = "") => {
  const categorie = await CategorieModel.findById(id);
  if (!categorie.state) throw new Error("CATEGORIE_ID_INVALIDATE_OR_BLOCKED");
};

const existProduct = async (id = "") => {
  const product = await ProductModel.findById(id);
  if(!product) throw new Error("NOT_EXIST_PRODUCT_WITH_THIS_ID")
};


module.exports = { roleValidator, mongoIdValidator, existCategorie, existProduct };
