const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Remove espaços extras
    },
    description: {
      type: String,
      trim: true, // Opcional, mas limpo
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task", // Referência à Task
      required: true, // Agora é obrigatório ter uma Task associada
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", CardSchema);
