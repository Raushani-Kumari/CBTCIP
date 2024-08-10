import React, { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import RefreshHandler from "./utils/RefreshHandler";

function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const PrivateRoute = ({element}) =>{
    return isAuthenticated ? element : <Navigate to="/login" />;
    
  }
  // console.log(isAuthenticated);
  return (
    <div className="App">
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
      </div>
  );
};

export default App;
