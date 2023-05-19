const { Schema, model } = require("mongoose");

const ProductScheme = Schema({
  name: {
    type: String,
    require: true,
  },
  state: {
    type: Boolean,
    require: true,
    default: true,
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },

  description: {
    type: String,
  },
  stock: {
    type: Boolean,
    required: true,
    default: true,
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: "Categorie",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ProductScheme.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", ProductScheme);
