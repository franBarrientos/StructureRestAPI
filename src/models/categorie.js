const { Schema, model } = require("mongoose");

const CategorieScheme = Schema({
  name: {
    type: String,
    require: true,
  },
  state: {
    type: Boolean,
    require: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


CategorieScheme.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
  };

module.exports = model("Categorie", CategorieScheme);
