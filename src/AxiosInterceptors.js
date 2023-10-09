import axios from "axios";
import { Navigate } from "react-router-dom";
import { RefreshToken } from "./custom hooks/RefreshToken";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:3500/employees",
// });
// const token = localStorage.getItem("token");
// let headers = {
//   "Content-type": "application/json; charset=UTF-8",
//   Authorization: "Bearer " + token,
// };

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3500",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // console.log("errrrr", error);
    const originalRequest = error.config;
    if (error.response.status === 403) {
      // originalRequest._retry = true;
      const resp = await RefreshToken();
      console.log(resp);
      const token = resp.accessToken;

      localStorage.setItem("token", token);

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);
