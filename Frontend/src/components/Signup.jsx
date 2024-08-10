import React, { useState } from "react";
import "../App.css";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Utils";

function Signup() {

  const [signupInfo, setSignupInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  // console.log("signupInfo -> ", signupInfo);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password } = signupInfo;
    if (!fname || !email || !password) {
      return handleError("All fields are required!!");
    }
    try {
        const url = "http://localhost:4000/api/v/message/signup";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const {success, message, error} = result;
        if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate('/login')
            }, 1000)
        }else if(error){
            const details = error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
        console.log(result);
        
    } catch (error) {
        handleError(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="fname">Fname</label>
            <input
              onChange={handleChange}
              type="text"
              name="fname"
              autoFocus
              placeholder="Enter first name"
              value={signupInfo.fname}
            />
          </div>
          <div>
            <label htmlFor="lname">Lname</label>
            <input
              onChange={handleChange}
              name="lname"
              type="text"
              placeholder="Enter last name"
              value={signupInfo.lname}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter email"
              value={signupInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter password"
              value={signupInfo.password}
            />
          </div>
          <button type="submit">Sign Up</button>
          <span>
            Already have an account ?<Link to="/login">Log in</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}

export default Signup;
