import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/navbar.css"; 

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h1 className="logo">Quiz Insano</h1>
      <a className="homepage" href="/homepage">
        Home Page
      </a>
      <button className="logout-button" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}

export default Navbar;
