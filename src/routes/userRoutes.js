const express = require("express");
const { getUsers, addUser, updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// @route GET /api/users
// @desc Get all records (Protected)
router.get("/", authMiddleware, getUsers);

// @route POST /api/users
// @desc Add a new record (Protected)
router.post("/", authMiddleware, addUser);

// @route PUT /api/users/:id
// @desc Update a record (Protected)
router.put("/:id", authMiddleware, updateUser);

// @route DELETE /api/users/:id
// @desc Delete a record (Protected)
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
