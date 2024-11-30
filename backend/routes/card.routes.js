const express = require('express');
const router = express.Router();
const Card = require('../models/card.model.js');

router.post('/', async (req, res) => {
    try {
        const { title, description, type } = req.body;

    
        const newCard = new Card({ title, description, type });
        const savedCard = await newCard.save();

        res.status(201).json(savedCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        const { title, description, type } = req.body;

    
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,
            { title, description, type },
            { new: true }
        );

        if (!updatedCard) {
            return res.status(404).json({ error: 'Card não encontrado' });
        }

        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;

    
        const deletedCard = await Card.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({ error: 'Card não encontrado' });
        }

        res.status(200).json({ message: 'Card deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
