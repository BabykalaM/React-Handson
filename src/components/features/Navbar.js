import React, { useEffect } from "react";
import "./style.css";
import { RxAvatar } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/reducer";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useAuth();
  useEffect(() => {
    console.log("ss", state);
  }, [state]);

  // const user = localStorage.getItem("user");

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleClick = async () => {
    try {
      const res = await axios.get("http://localhost:3500/logout");
      if (res.status === 204) {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <nav className="">
        <div className="row navbar d-flex justify-content-center">
          <div className="col-auto">
            <Link
              to="/"
              className={`text-decoration-none text-dark ${
                isActive("/") ? "active" : ""
              }`}
            >
              Home
            </Link>
          </div>
          <div className="col-auto">
            <Link
              to="/dashboard"
              className={`text-decoration-none text-dark ${
                isActive("/dashboard") ? "active" : ""
              }`}
            >
              Dashboard
            </Link>
          </div>
          <div className="col-auto dropdown">
            <div
              className="dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Employee
            </div>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/employee">
                  Employee List
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/employee/add">
                  Add Employee
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6"></div>
          <div className="col-2 text-end profile">
            <Link
              to="/login"
              className="rounded-circle text-decoration-none text-dark"
              onClick={handleClick}
            >
              <RxAvatar className="image" />
              <div>{state.user}</div>
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
