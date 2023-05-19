const { handleError, handleSucces } = require("../utils");
const { ObjectId } = require("mongoose").Types;
const collectionesAllowed = ["categories", "products", "users"];

const search = async (req, res) => {
  try {
    const { collection, item } = req.params;
    if (!collectionesAllowed.includes(collection))
      throw new Error("DOESN'T EXIST THIS COLLECTION");
    const nameModel = collection.slice(0, -1);
    const model = require(`../models/${nameModel}`);
    let itemSearched = null;
    if (ObjectId.isValid(item)) {
      itemSearched = await model.findById(item);
    } else {
      const exp = new RegExp(item, "i");
      itemSearched = await model.find({
         $or: [{ name: exp }, {email:exp}],
         $and: [{state:true}]
        });

      if (itemSearched.length < 1) throw new Error("DOESN'T EXIST THIS ITEM");
    }
    if (!itemSearched) throw new Error("DOESN'T EXIST THIS ITEM");
    handleSucces(res, itemSearched);
  } catch (error) {
    handleError(res, "ERROR_ON_SEARCH_ITEM", 403, error);
  }
};

module.exports = { search };
