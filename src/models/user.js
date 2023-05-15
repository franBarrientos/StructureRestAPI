const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: Number,
    default: 1,
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

/**
 * Below I modify the method to return an instance of the model of user, and i remove password from this, for return to frontend

 */
UserSchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
