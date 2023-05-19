const ProductModel = require("../models/product");
const { handleError, handleSucces, handleMessageDelete } = require("../utils");

const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, from = 0 } = req.query;
    const [Products, count] = await Promise.all([
      ProductModel.find({ state: true })
        .skip(Number(from))
        .limit(Number(limit))
        .populate("user", ["name", "email", "role"])
        .populate("categorie", ["name"]),
      ProductModel.countDocuments({ state: true }),
    ]);
    handleSucces(res, { Products, count });
  } catch (error) {
    handleError(res, "ERROR_GET_ALL_PRODUCTS", 500, error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const Product = await ProductModel.findById(id)
      .populate("user", ["name", "email", "role"])
      .populate("categorie", ["name"]);
    handleSucces(res, Product);
  } catch (error) {
    handleError(res, "ERROR_GET_PRODUCT", 500, error);
  }
};

const createProduct = async (req, res) => {
  try {
    const name = req.body.name.toUpperCase();
    let Product = await ProductModel.findOne({ name });
    if (Product) throw new Error("Already Exist that Product!");
    const data = {
      name,
      user: req.administrator.id,
      categorie: req.body.categorie,
      price: req.body.price,
      description: req.body.description,
    };
    Product = new ProductModel(data);
    await Product.save();
    handleSucces(res, Product);
  } catch (error) {
    handleError(res, "ERROR_CREATE_PRODUCT", 500, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, state, ...data } = req.body;
    data.name = data.name.toUpperCase();
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    handleSucces(res, updatedProduct);
  } catch (error) {
    handleError(res, "ERROR_UPDATE_Product", 500, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { administrator } = req;
    const deletedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        state: false,
      },
      {
        new: true,
      }
    );
    handleMessageDelete(administrator, deletedProduct);
    handleSucces(res, { Product: deletedProduct, administrator });
  } catch (error) {
    handleError(res, "DELETE_Product_ERROR", 500, error);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
