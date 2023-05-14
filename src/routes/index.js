const fs = require("fs");
const { Router } = require("express");
const router = Router();

const removeExtension = (nameFile) => {
  return nameFile.split(".").shift();
};

fs.readdirSync(__dirname).filter((e) => {
  const name = removeExtension(e);
  if (name != "index") router.use(`/${name}`, require(`./${name}`));
});

module.exports = router;
