// import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "../components/header.css"; 

const Header = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); // Example: Clearing localStorage data

    // Navigate to the email input page (e.g., "/email")
    navigate("/");
  };

  return (
    <header className="header-custom text-white py-4 px-6">
      <div className="headerAlignment">
        <h1 className="heading">React Web APP</h1>
        {location.pathname === "/dashboard" && (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </header>
  );
};

export default Header;
