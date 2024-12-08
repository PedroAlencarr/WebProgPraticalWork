const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
    },

    description: {
      type: String,
      trim: true, 
    },

    status: {
      type: String,
      enum: ["To Do", "Doing", "Done", "Rejected"],
      required: true,
      default: "To Do", 
    },

    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", CardSchema);
