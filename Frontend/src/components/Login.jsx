import React, { useEffect, useState } from "react";
import "../App.css";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  // console.log("LoginInfo -> ", loginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and Password are required!!");
    }
    try {
      const url = "http://localhost:4000/api/v/message/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("loggedInUser", name);
          // console.log("token",jwtToken);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Log in</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter email"
              value={loginInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter password"
              value={loginInfo.password}
            />
          </div>
          <button type="submit">Log in</button>
          <span>
            Doesn't have an account ?<Link to="/signup">Sign Up</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
