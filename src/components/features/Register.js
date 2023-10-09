import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("input", input);
    try {
      const username = input.firstname + input.lastname;
      console.log("username", username);
      const res = await axios.post("http://localhost:3500/register", {
        user: username,
        pwd: input.password,
      });
      console.log("res", res);
      if (res.status === 201) {
        setMsg(res.data.success);
        navigate("/login");
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 409) setMsg("User already exists in db");
      // else setError(err.response.data.message);
      // console.log(err.response.data);
    }
    // setMsg("");
  };
  const handleChange = (evnt) => {
    const inputValue = evnt.target.value.trim();
    const inputFieldName = evnt.target.name;
    const NewInput = {
      ...input,
      [inputFieldName]: inputValue,
    };
    setInput(NewInput);
  };

  const handlePasswordValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;

    if (passwordInputFieldName === "password") {
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
    }
    // for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        input.confirmPassword.length > 0)
    ) {
      if (input.confirmPassword !== input.password) {
        setConfirmPasswordError("Confirm password is not matched");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  return (
    <>
      <div className="m-2">
        <h3>Registration Form</h3>
      </div>

      <div className="m-2 border rounded p-4 registerform">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              onKeyUp={handlePasswordValidation}
            />
            <p className="text-danger">{passwordError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              onKeyUp={handlePasswordValidation}
            />
            <p className="text-danger">{confirmPasswordError}</p>
          </div>
          <div className="text-danger">{msg}</div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
