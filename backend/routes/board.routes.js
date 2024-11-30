const express = require("express");
const router = express.Router();
const Board = require("../models/board.model.js");

router.post("/", async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    const newBoard = new Board({ title, description, createdBy });
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const boards = await Board.find({ createdBy: req.params.userId });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:boardId", async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title, description } = req.body;
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { title, description },
      { new: true }
    );
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:boardId", async (req, res) => {
  try {
    const { boardId } = req.params;
    
    // Tenta excluir o board
    const board = await Board.findByIdAndDelete(boardId);
    
    // Se não encontrar o board, retorna um erro
    if (!board) {
      return res.status(404).json({ message: "Board não encontrado" });
    }

    res.status(200).json({ message: "Board deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
