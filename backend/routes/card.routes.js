const express = require("express");
const router = express.Router();

const {
  createCard,
  getCards,
  updateCard,
  deleteCard,
} = require("../controllers/card.controller.js");

router.get("/", getCards);
router.post("/", createCard);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;