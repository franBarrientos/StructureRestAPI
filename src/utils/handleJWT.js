const jwt = require("jsonwebtoken");
const LlaveJWT = process.env.LLAVE_JWT;

const tokenSign = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    LlaveJWT,
    {
      expiresIn: "2h",
    }
  );
};

const verifyToken = (tokenJWT) => {
  try {
    return jwt.verify(tokenJWT, LlaveJWT);
  } catch (error) {
    return {id:null, role:null};
  }
};

module.exports = { tokenSign, verifyToken };
