import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./components/firebase";
import Login from "./screens/login";
import Counter from "./screens/Counter";
import Register from "./screens/register";
import UserDataForm from "./screens/UserDataForm";
import UserList from "./screens/userlist";
import RichTextEditor from "./screens/RichTextEditor";

import "./App.css";

// Import Firebase User type
import { User } from "firebase/auth";

function App() {
  // Explicitly define the user state to accept either User or null
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Safely assign the user value to the state
    });

    // Cleanup listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/counter" /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/userdata" element={<UserDataForm />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/RichTextEditor" element={<RichTextEditor />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
