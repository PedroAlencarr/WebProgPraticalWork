const express = require('express');
const router = express.Router();
const Task = require('../models/task.model.js');

router.post('/', async (req, res) => {
    try {
        const { title, description, type, board } = req.body;
        const newTask = new Task({ title, description, type, board });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/board/:boardId', async (req, res) => {
    try {
        const tasks = await Task.find({ board: req.params.boardId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, type } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, type },
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ message: 'Task deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
