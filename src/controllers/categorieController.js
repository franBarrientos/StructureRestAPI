const CategorieModel = require("../models/categorie");
const { handleError, handleSucces } = require("../utils");

const getAllCategorie = async (req, res) => {
  try {
    const { limit = 10, from = 0 } = req.query;
    const [categories, count] = await Promise.all([
      CategorieModel.find({ state: true })
        .skip(Number(from))
        .limit(Number(limit))
        .populate("user"),
      CategorieModel.countDocuments({ state: true }),
    ]);
    handleSucces(res, { categories, count });
  } catch (error) {
    handleError(res, "ERROR_GET_ALL_CATEGORIES", 500, error);
  }
};

const getCategorie = async (req, res) => {
  try {
    const categorie = await CategorieModel.findById(req.params.id).populate(
      "user"
    );
    handleSucces(res, categorie);
  } catch (error) {}
};

const createCategorie = async (req, res) => {
  try {
    const name = req.body.name.toUpperCase();
    let categorie = await CategorieModel.findOne({ name });
    if (categorie) throw new Error("Already Exist that Categorie!");
    const data = {
      name,
      user: req.administrator.id,
    };
    categorie = new CategorieModel(data);
    await categorie.save();
    handleSucces(res, categorie);
  } catch (error) {
    handleError(res, "ERROR_CREATE_CATEGORIE", 500, error);
  }
};

const updateCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, user } = req.body;
    const updatedCategorie = await CategorieModel.findByIdAndUpdate(
      id,
      { name, user },
      { new: true }
    );
    handleSucces(res, updatedCategorie);
  } catch (error) {
    handleError(res, "ERROR_UPDATE_CATEGORIE", 500, error);
  }
};

const deleteCategorie = async (req, res) => {
  try {
    handleSucces(res, "Working...");
  } catch (error) {}
};

module.exports = {
  getAllCategorie,
  getCategorie,
  createCategorie,
  updateCategorie,
  deleteCategorie,
};
