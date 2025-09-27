import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicAxios } from "../api/axiosConfig";

const PostListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await publicAxios.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-bold text-xl">{post.title}</h3>
          <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
          <Link
            to={`/posts/${post._id}`}
            className="text-blue-600 hover:underline"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostListPage;
