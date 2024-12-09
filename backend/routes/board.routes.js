const express = require("express");
const router = express.Router();
const Board = require("../models/board.model.js");
const {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardsByUserId
} = require("../controllers/board.controller.js");
const isAuthenticated = require("../middlewares/auth");

router.get('/current', isAuthenticated, getBoardsByUserId);
router.get("/", isAuthenticated, getBoards);
router.get("/:id", isAuthenticated, getBoardById);
router.post("/", isAuthenticated, createBoard);
router.patch("/:id", updateBoard);
router.delete("/:id", deleteBoard);



module.exports = router;