const express = require("express");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

// Add a comment to a post
router.post("/:postId/comments", authMiddleware, addComment);

// Get all comments for a post
router.get("/:postId/comments", getComments);

// Delete a comment
router.delete("/:postId/comments/:commentId", authMiddleware, deleteComment);

module.exports = router;
