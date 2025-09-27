import React, { useState } from "react";
import { publicAxios } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await publicAxios.post("/auth/register", formData);
    localStorage.setItem("token", res.data.token);
    alert("Registration successful!");
    navigate("/posts");
  } catch (error) {
    // safer error handling
    if (error.response && error.response.data) {
      alert(error.response.data.message);
    } else {
      alert("Network or server error, please try again.");
      console.error(error); // logs the actual error for debugging
    }
  }
};


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
