const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    
    board: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
        required: false,
      },
    ],
  },

  //O mongo já vai usar o timestamp para marcar a hora da criação e atualização/deleção
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
