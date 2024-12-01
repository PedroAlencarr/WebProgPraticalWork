const Card = require("../models/card.model.js");
const Board = require("../models/board.model.js");

const createCard = async (req, res) => {
  try {
    const { title, description, status, board } = req.body;
    const newCard = await Card.create({
      title,
      description,
      status: status || "To Do",
      board,
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCard = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Card.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Card não encontrado" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const cardExists = await Card.findById(id);
    if (!cardExists) {
      return res.status(404).json({ message: "Card não encontrado" });
    }

    const boardsUpdated = await Board.updateMany(
      { cards: id },
      { $pull: { cards: id } } // Remove o ID do Card do array
    );

    console.log(`Boards atualizados: ${boardsUpdated.modifiedCount}`);
    await Card.findByIdAndDelete(id);

    res.status(200).json({
      message: "Card deletado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard,
};
