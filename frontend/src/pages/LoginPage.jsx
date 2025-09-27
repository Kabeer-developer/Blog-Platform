import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAxios } from "../api/axiosConfig"; // use named export for public requests

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicAxios.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/posts");
    } catch (error) {
      // Safe error handling
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("Network or server error. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
/>
        <input
  type="password"
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
/>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
