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
    const updateBoard = await Board.findByIdAndUpdate(id, req.body, { new: true });
    const updatedBoard = await Board.findById(req.params.id);

    res.status(200).json(updateBoard);

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

const addContribuitorToBoard = async (req, res) => {  
  try {
    const { addedUserEmail } = req.body;
    const { boardId } = req.params
    const userId = req.userId

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(401).json({ message: "Acesso negado" });
    }

    const addedUser = await User.findOne({ email: addedUserEmail })
    if (!addedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    
    const addedUserId = addedUser._id
    console.log(addedUserId)
    console.log(board.createdBy.toString() == addedUserId.toString())
    console.log(board.createdBy.toString())
    console.log(addedUserId.toString())

    if (board.createdBy.toString() == addedUserId.toString()) {
      return res.status(400).json({ message: "Usuário já é proprietário do board" });
    }

    if (board.sharedWith.includes(addedUserId)) {
      return res.status(400).json({ message: "Usuário já é contribuidor do board" });
    }

    // Atualizar o board para adicionar o userId no shareWith
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { $addToSet: { sharedWith: addedUserId } }, // $addToSet evita duplicados no array
      { new: true } // Retorna o board atualizado
    );
    res.status(200).json({ message: "Usuário adicionado ao board com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao adicionar usuário ao board", error: err });
  }
}

const removeContribuitorFromBoard = async (req, res) => {  
  try {
    const { removedUserEmail } = req.body;
    const { boardId } = req.params
    const userId = req.userId

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    if (board.createdBy.toString() !== userId && !board.sharedWith.includes(userId)) {
      return res.status(401).json({ message: "Acesso negado" });
    }

    const removedUser = await User.findOne({ email: removedUserEmail })
    if (!removedUser) {
      return res.status(404).json({ message: "Usuário já não tem acesso ao board" });
    }
    
    const removedUserId = removedUser._id

    if (board.createdBy == removedUserId) {
      return res.status(400).json({ message: "O proprietário do board não pode ser removido" });
    }

    if (!board.sharedWith.includes(removedUserId)) {
      return res.status(400).json({ message: "Usuário já não é contribuidor do board" });
    }

    // Atualizar o board para adicionar o userId no shareWith
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { $pull: { sharedWith: removedUserId } }, // 
      { new: true } // Retorna o board atualizado
    );
    res.status(200).json({ message: "Usuário removido do board com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao adicionar usuário ao board", error: err });
  }
}

const getContribuitors = async (req, res) => {
  try {
    const { boardId } = req.params; 
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    const collaborators = await User.find({
      '_id': { $in: board.sharedWith }
    });

    res.status(200).json(collaborators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar colaboradores", error });
  }
};




module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardsByUserId,
  addContribuitorToBoard,
  removeContribuitorFromBoard,
  getContribuitors
};
