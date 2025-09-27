const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      content,
      author: req.user._id,
      post: post._id,
    });

    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username email");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
