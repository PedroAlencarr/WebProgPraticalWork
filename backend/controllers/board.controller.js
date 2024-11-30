const Board = require("../models/board.model.js");

// Função para listar todos os boards
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar boards", error: err });
  }
};

// Função para obter um board específico
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar board", error: err });
  }
};

// Função para criar um novo board
exports.createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBoard = new Board({ title, description });
    await newBoard.save();
    res.status(201).json({ message: "Board criado com sucesso!", board: newBoard });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar board", error: err });
  }
};

// Função para excluir um board
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }
    res.json({ message: "Board excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir board", error: err });
  }
};
