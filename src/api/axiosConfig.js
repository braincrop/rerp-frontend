"use client";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const instanceAuth = axios.create({
  baseURL: baseURL,
});

// instanceAuth.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("_schoolware_token_userinfo_");
//     if (token) {
//       config.headers["authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instanceAuth.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("_schoolware_token_userinfo_");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export { axiosInstance,instanceAuth };
