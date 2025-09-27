import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { publicAxios, authAxios } from "../api/axiosConfig";

const SinglePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Edit post state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch post and comments
 useEffect(() => {
  const fetchPostAndComments = async () => {
    try {
      const postRes = await publicAxios.get(`/posts/${id}`);
      setPost(postRes.data);

      const commentsRes = await publicAxios.get(`/posts/${id}/comments`);
      setComments(commentsRes.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchPostAndComments();
}, [id]);


  // Add a comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const res = await authAxios().post(`/posts/${id}/comments`, {
        content: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add comment");
    }
  };

  // Delete a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await authAxios().delete(`/posts/${id}/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete comment");
    }
  };

  // Delete post
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await authAxios().delete(`/posts/${id}`);
      alert("Post deleted successfully");
      navigate("/posts"); // Redirect after delete
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete post");
    }
  };

  // Start editing
  const startEdit = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditing(true);
  };

  // Update post
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await authAxios().put(`/posts/${id}`, {
        title: editTitle,
        content: editContent,
      });
      setPost(res.data);
      setIsEditing(false);
      alert("Post updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update post");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      {/* Post Section */}
      {!isEditing ? (
        <>
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-4">{post.content}</p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={startEdit}
              className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600"
            >
              Edit Post
            </button>
            <button
              onClick={handleDeletePost}
              className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
            >
              Delete Post
            </button>
          </div>
        </>
      ) : (
        <form className="mt-4" onSubmit={handleUpdatePost}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
          >
            Update Post
          </button>
        </form>
      )}

      {/* Comments Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <form className="mb-4" onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 border rounded"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
          >
            Comment
          </button>
        </form>

        {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
          >
            <p>{comment.content}</p>
            <button
              onClick={() => handleDeleteComment(comment._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePostPage;
