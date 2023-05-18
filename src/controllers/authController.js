const UserModel = require("../models/user");
const {compare, handleError, handleSucces, tokenSign, googleVerify } = require("../utils")
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");
    if (!(await compare(password, user.password)))
      throw new Error("Password Incorrect");
    if (!user.state) throw new Error("False State");
    const token = tokenSign(user.id, user.role);
    handleSucces(res, { user, token });
  } catch (error) {
    handleError(res, "ERROR_LOGIN", 403, error);
  }
};

const googleSignIn = async (req, res) => {
  try {
    const { id_token } = req.body;
    const {name, img, email} = await googleVerify(id_token);
    const data = {
      name,
      img,
      email,
      password:"123",
      google:true,
      role:"USER_ROLE"
    }
    let user = await UserModel.findOneAndUpdate({email},data,{
      new: true,
    });

    if(!user){
      const userNew = new UserModel(data);
      await userNew.save();  
      const token = tokenSign(userNew.id, userNew.role);
      handleSucces(res, {user:userNew, token})
    }else{
      const token = tokenSign(user.id, user.role);
      handleSucces(res, {user, token})
    }
  } catch (error) {
    handleError(res, "ERROR_GOOGLE", 500, error);
  }
};

module.exports = { login, googleSignIn };
