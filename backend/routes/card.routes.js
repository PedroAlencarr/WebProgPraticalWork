const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");

const {
  createCard,
  getCards,
  updateCard,
  deleteCard,
  getCardsByBoard
} = require("../controllers/card.controller.js");

router.get("/", getCards);
router.get('/:boardId', isAuthenticated, getCardsByBoard);
router.post("/:boardId/", isAuthenticated, createCard);
router.patch("/:id", isAuthenticated, updateCard);
router.delete("/:id", isAuthenticated, deleteCard);

module.exports = router;