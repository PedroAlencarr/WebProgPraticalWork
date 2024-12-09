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

const getBoardById = async (req, res) => {
  const userId = req.userId
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(401).json({ message: "Acesso negado" });
    }

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar board", error: err });
  }
};

const createBoard = async (req, res) => {
  try {

    const { title, description } = req.body;
    const userId = req.userId;

    if (title.length == 0) {
      return res.status(400).json({ message: 'O Board precisa ter um título!' })
    }

    const board = await Board.create({
      title,
      description,
      createdBy: userId,
    });
    

    res.status(201).json({ message: "Board criado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao criar board", error: err });
  }
};

const updateBoard = async (req, res) => {
  const userId = req.userId
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(401).json({ message: "Acesso negado" });
    }

    const id = req.params.id;
    const update_board = await Board.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(board);

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteBoard = async (req, res) => {
  const userId = req.userId
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(401).json({ message: "Acesso negado" });
    }
    
    await Card.deleteMany({ board: req.params.id });
    await User.updateMany(
      { board: req.params.id },
      { $pull: { board: req.params.id } }
    );
    const deleted_board = await Board.findByIdAndDelete(req.params.id);

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
