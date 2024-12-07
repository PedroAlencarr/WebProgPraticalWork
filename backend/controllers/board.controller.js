const Board = require("../models/board.model.js");
const Card = require("../models/card.model.js");
const User = require("../models/user.model.js");

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({});
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar boards", error: err });
  }
};

//TO DO REGEX
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }
    res.status(200).res.send(board);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar board", error: err });
  }
};

const createBoard = async (req, res) => {
  try {
    const newBoard = new Board(req.body);
    await newBoard.save();
    const populatedBoard = await Board.findById(newBoard._id).populate({
      path: "createdBy",
      select: "first_name last_name email",
    });

    res.status(201).json({
      message: "Board criado com sucesso!",
      board: populatedBoard,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao criar board", error: err });
  }
};

const updateBoard = async (req, res) => {
  try {
      const id = req.params.id;
      const board = await Board.findByIdAndUpdate(id, req.body, { new: true });
      if (!board) {
          res.status(404).json({ message: 'Board não encontrado' });
          return;
      }
      res.status(200).json(board);

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    await Card.deleteMany({ board: req.params.id });
    await User.updateMany(
      { board: req.params.id },
      { $pull: { board: req.params.id } }
    );
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }
    res.status(200).json({ message: "Board excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir board", error: err });
  }
};

const getBoardsByUserId = async (req, res) => {
  try {
    const userId = req.userId
    
    const boards = await Board.find({
      $or: [
        { createdBy: userId }, 
        { sharedWith: userId }
      ]
    })

    res.status(200).json(boards)
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar boards", error: err });
  }
}


module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardsByUserId,
};
