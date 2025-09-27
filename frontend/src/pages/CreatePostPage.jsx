import React, { useState } from "react";
import { authAxios } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAxios().post("/posts", formData);
      alert("Post created successfully!");
      navigate("/posts");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          className="w-full p-2 border rounded"
          rows={6}
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
