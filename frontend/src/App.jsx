import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages (will implement later)
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import SinglePostPage from "./pages/SinglePostPage";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex justify-between">
          <div className="space-x-4">
            <Link to="/posts" className="font-bold text-blue-600">Blog</Link>
            <Link to="/create" className="text-gray-700 hover:text-blue-600">Create Post</Link>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </div>
        </nav>

        <div className="p-6">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/:id" element={<SinglePostPage />} />
            <Route path="/create" element={<CreatePostPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
