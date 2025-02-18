import React, { useEffect } from "react";


import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./screens/login";
import Counter from "./screens/Counter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { auth } from "./components/firebase";
import Register from "./screens/register";
import UserDataForm from "./screens/UserDataForm";
import UserList from "./screens/userlist";
import RichTextEditor from "./screens/RichTextEditor";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        
          
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/counter" /> : <Login />}
                
              />
              <Route path="/" element={<Counter/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/counter" element={<Counter/>} />
              <Route path="/userdata" element={<UserDataForm/>} />
              <Route path="/UserList" element={<UserList/>} />
              <Route path="/RichTextEditor" element={<RichTextEditor/>} />



              
            </Routes>
            <ToastContainer />
         
      </div>
    </Router>
  );
}

export default App;