import axios from "axios";
import { Navigate } from "react-router-dom";

export const RefreshToken = async () => {
  try {
    // const refreshToken = Cookies.get("jwt");
    // console.log("refreshToken", refreshToken);
    // const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.get("http://localhost:3500/refresh", {
      withCredentials: true,
    });
    console.log("refresh", response.data);
    return response.data;
  } catch (error) {
    // Handle refresh token error or redirect to login
    console.log(error);
    Navigate("/login");
  }
};
