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
  getCurrentUser,
  updateCurrentUser
} = require("../controllers/user.controller.js");
const isAuthenticated = require("../middlewares/auth");

router.get("/current", isAuthenticated, getCurrentUser);
router.patch("/current", isAuthenticated, updateCurrentUser);
router.get("/:id", isAuthenticated, getUser);
router.get("/", isAuthenticated, getUsers);
router.post("/", createUser);
router.patch("/current", isAuthenticated, updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);



module.exports = router;
