const express = require("express");
const router = express.Router();
const Board = require("../models/board.model.js");
const {
  getBoardById,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardsByUserId,
  addContribuitorToBoard,
  removeContribuitorFromBoard,
  getContribuitors
} = require("../controllers/board.controller.js");
const isAuthenticated = require("../middlewares/auth");

router.get('/current', isAuthenticated, getBoardsByUserId);
router.get("/:id", isAuthenticated, getBoardById);
router.post("/", isAuthenticated, createBoard);
router.post('/:boardId/add_user', isAuthenticated, addContribuitorToBoard);
router.post('/:boardId/remove_user', isAuthenticated, removeContribuitorFromBoard);
router.get('/:boardId/getUsers', isAuthenticated, getContribuitors);
router.patch("/:id", isAuthenticated, updateBoard);
router.delete("/:id", isAuthenticated, deleteBoard);

module.exports = router;