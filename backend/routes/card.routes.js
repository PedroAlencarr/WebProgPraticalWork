const express = require("express");
const router = express.Router();
const Card = require("../models/card.model.js");
const Task = require("../models/task.model.js");

// Criar um novo Card
router.post("/", async (req, res) => {
  try {
    const { title, description, type, taskId } = req.body;

    const newCard = new Card({ title, description, type, task: taskId }); // Associe o card à task, se passado
    const savedCard = await newCard.save();

    res.status(201).json(savedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os Cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um Card
router.put("/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const { title, description, type, taskId } = req.body;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { title, description, type, task: taskId }, // Atualiza também a task associada, se necessário
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ error: "Card não encontrado" });
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um Card
router.delete("/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;

    const deletedCard = await Card.findByIdAndDelete(cardId);

    if (!deletedCard) {
      return res.status(404).json({ error: "Card não encontrado" });
    }

    res.status(200).json({ message: "Card deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mover o Card para uma nova Task
router.put("/:cardId/move", async (req, res) => {
  try {
    const { cardId } = req.params;
    const { taskId } = req.body;

    // Verifica se a nova Task existe
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task não encontrada" });
    }

    // Atualiza o Card, movendo-o para a nova Task
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { task: taskId }, // Atualiza a associação com a nova Task
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card não encontrado" });
    }

    res.status(200).json({
      message: "Card movido para a nova Task com sucesso!",
      card: updatedCard,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
