import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Header({ shownavbar, setshownavbar }) {
    const navigate = useNavigate();

    const handleclick=(nav) => {
        navigate(nav)
    }

  return (
    <div className="Header">
      <div className="left-section">
        <p>HAZARA TRAFFIC POLICE</p>
        <p className="home" onClick={() => handleclick("/")}>
          Home
        </p>
      </div>
      <div className="right-section">
        <button onClick={() => handleclick("/Login")}>Login</button>
      </div>

      <div className="first-section">
        <p>HAZARA TRAFFIC POLICE</p>
        <FontAwesomeIcon
          icon={faBars}
          className="icon"
          onClick={() => setshownavbar(!shownavbar)}
        />
      </div>

      {/* Add the "open" class based on shownavbar */}
      <div className={`second-section ${shownavbar ? "open" : ""}`}>
        <p className="home" onClick={() => handleclick("/")}>
          Home
        </p>
        <button className="lgin" onClick={() => handleclick("/Login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;
