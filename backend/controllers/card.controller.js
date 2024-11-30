const Card = require("../models/card.model.js");
const Task = require("../models/task.model.js");

const moveCardToTask = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { taskId } = req.body; // ID da nova Task que o Card será movido

    // Verificar se a nova Task existe
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task não encontrada" });
    }

    // Atualizar o Card, associando-o à nova Task
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { task: taskId }, // Atualizar a task associada ao card
      { new: true } // Retorna o card atualizado
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
};

module.exports = {
  moveCardToTask,
};
