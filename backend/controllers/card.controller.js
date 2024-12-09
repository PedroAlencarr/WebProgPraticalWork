const Card = require("../models/card.model.js");
const Board = require("../models/board.model.js");

const createCard = async (req, res) => {
  try {
    const { title, description } = req.body;
    var { status } = req.body;
    const { boardId } = req.params;
    const userId = req.userId;
    
    if (title.length == 0) {
      return res.status(400).json({ message: 'O card precisa ter um título!' })
    }

    const board = await Board.findById(boardId)
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(403).json({ message: "Você não tem permissão para adicionar um card a este board!" });
    }

    if (!status) {
      status = "To Do";
    }

    const newCard = await Card.create({
      title,
      description,
      status,
      board: boardId,
      createdBy: userId
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

const getCardsByBoard = async (req, res) => {
  try {
    const userId = req.userId;
    const { boardId } = req.params;
    const board = await Board.findById(boardId)
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(403).json({ message: "Você não tem permissão para visualizar os cards deste board!" });
    }

    const cards = await Card.find({ board: boardId });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateCard = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card não encontrado" });
    }

    const board = await Board.findById(card.board);

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(403).json({ message: "Você não tem permissão para editar este card!" });
    }

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
    const userId = req.userId;
    const { id } = req.params;
    const cardExists = await Card.findById(id);
    if (!cardExists) {
      return res.status(404).json({ message: "Card não encontrado" });
    }

    const board = await Board.findById(cardExists.board);

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(403).json({ message: "Você não tem permissão para deletar este card!" });
    }

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
  getCardsByBoard
};
