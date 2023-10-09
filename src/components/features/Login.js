import React, { useContext, useState } from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/reducer";

const Login = () => {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [error, setError] = useState();

  const handlePasswordValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = passwordInputValue.length;

    const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
    const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
    const digitsPassword = digitsRegExp.test(passwordInputValue);
    const specialCharPassword = specialCharRegExp.test(passwordInputValue);
    const minLengthPassword = minLengthRegExp.test(passwordInputValue);
    let errMsg = "";
    if (passwordLength === 0) {
      errMsg = "Password should not be empty";
    } else if (!uppercasePassword) {
      errMsg = "Password contains atleast one Uppercase letter";
    } else if (!lowercasePassword) {
      errMsg = "Password contains atleast one Lowercase letter";
    } else if (!digitsPassword) {
      errMsg = "Password contains atleast one digit";
    } else if (!specialCharPassword) {
      errMsg = "Password contains atleast one Special Character";
    } else if (!minLengthPassword) {
      errMsg = "Password contains atleast minumum 8 characters";
    } else {
      errMsg = "";
    }
    setPasswordErr(errMsg);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3500/auth",
        {
          user: username,
          pwd: password,
        },
        { withCredentials: true }
      );
      console.log("res", res);

      if (res.status === 200) {
        const data = { user: username, token: res.data.accessToken };
        dispatch({ type: "LOGIN", payload: data });
        navigate("/");
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) setError(err.response.data);
      // else if (err.response.status === 404) setError(err.response.data.message);
      // else setError("Server not found");
      // console.log(err.response.data);
    }
  };
  return (
    <>
      <div>
        <h3 className="mt-5 p-2 text-center">Sign in</h3>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4 border border-rounded loginform">
            <form className="loginform" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="text-left">
                  Username
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  maxLength={10}
                  onChange={(e) => {
                    const regex = /^[a-zA-Z0-9@]*$/;
                    if (regex.test(e.target.value)) {
                      setUsername(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="p-2">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={handlePasswordValidation}
                />
              </div>
              <div className="text-danger">{error}</div>
              <div className="text-danger">{passwordError}</div>
              <div className="text-center">
                <button className="btn btn-primary mt-3" type="submit" loading>
                  Sign in
                </button>
              </div>
            </form>
            {/* <div className="line"></div> */}
            <div className="text-center m-3">
              New around here?
              <Link to="/register" className="text-decoration-none p-2">
                Sign up
              </Link>
            </div>
            {/* <div className="text-center">
              <a href="">Forgot password?</a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
