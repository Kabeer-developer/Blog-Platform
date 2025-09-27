const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);      // Create post
router.get("/", getPosts);   // Get all posts
router.get("/:id", getPostById); // Get single post by ID
router.put("/:id", authMiddleware, updatePost);    // Update post
router.delete("/:id", authMiddleware, deletePost); // Delete post

module.exports = router;
