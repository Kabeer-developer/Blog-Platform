const express = require("express");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add comment to a post
router.post("/:postId", authMiddleware, addComment);

// Get all comments for a post
router.get("/:postId", getComments);

// Delete a comment
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;
