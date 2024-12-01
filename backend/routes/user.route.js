const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller.js");
const { protect } = require("../middlewares/auth");

router.get("/", getUsers);
router.get("/:id", protect, getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

module.exports = router;
