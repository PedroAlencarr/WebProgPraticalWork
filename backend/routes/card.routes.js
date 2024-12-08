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
router.get('/:boardId', getCardsByBoard);
router.post("/:boardId/", isAuthenticated, createCard);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;