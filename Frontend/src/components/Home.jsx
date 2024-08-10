import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/Utils";
import { ToastContainer } from "react-toastify";

function Home() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <>
      <div>
        <h1>homeee</h1>
        <h1>{loggedInUser}</h1>
        <button onClick={handleLogout}>Log out</button>
        <div>
            hello..welcome to home page
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
