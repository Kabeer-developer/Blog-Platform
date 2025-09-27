import axios from "axios";

export const authAxios = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { Authorization: `Bearer ${token}` },
  });
}


export const publicAxios = axios.create({
  baseURL: "http://localhost:5000/api",
});
