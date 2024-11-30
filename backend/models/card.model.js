const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Um título é obrigatório
      trim: true, // Remove espaços extras
    },
    description: {
      type: String,
      trim: true, // Opcional, mas limpo
    },
    type: {
      type: String,
      required: true,
      enum: ["To Do", "Doing", "Done", "Rejected"], // Tipos de tarefa permitidos
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', CardSchema); 
