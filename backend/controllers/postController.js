const Post = require("../models/Post");

// Create post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
