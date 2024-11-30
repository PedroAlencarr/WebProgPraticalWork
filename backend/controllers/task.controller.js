// controllers/task.controller.js
const Task = require("../models/task.model.js");

// Atualizar o tipo de uma task
const updateTaskType = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { type } = req.body;

    // Verifica se o tipo é válido
    if (!["To Do", "Doing", "Done", "Rejected"].includes(type)) {
      return res.status(400).json({ error: "Tipo de task inválido" });
    }

    // Atualiza o tipo da task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { type },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task não encontrada" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateTaskType,
};
