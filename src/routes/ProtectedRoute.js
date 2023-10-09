import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/reducer";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, dispatch] = useAuth();

  const checkUserToken = () => {
    const userToken = localStorage.getItem("token");
    // console.log(userToken);

    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? props.children : null}</>;
};
export default ProtectedRoute;
