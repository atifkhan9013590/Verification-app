import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Header({ shownavbar, setshownavbar }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();
        if (isTokenExpired) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleclick = (nav) => {
    navigate(nav);
    setshownavbar(false);
  };

  return (
    <div className="Header">
      <div className="left-section">
        <p>HAZARA TRAFFIC POLICE</p>
        <p className="home" onClick={() => handleclick("/")}>
          Home
        </p>
      </div>
      <div className="right-section">
        {isLoggedIn ? (
          <button onClick={() => handleclick("/AddNewEntry")}>Admin</button>
        ) : (
          <button onClick={() => handleclick("/Login")}>Login</button>
        )}
      </div>

      <div className="first-section">
        <p>HAZARA TRAFFIC POLICE</p>
        <FontAwesomeIcon
          icon={faBars}
          className="icon"
          onClick={() => setshownavbar(!shownavbar)}
        />
      </div>

      <div className={`second-section ${shownavbar ? "open" : ""}`}>
        <p className="home" onClick={() => handleclick("/")}>
          Home
        </p>
        {isLoggedIn ? (
          <button className="lgin" onClick={() => handleclick("/AddNewEntry")}>
            Admin
          </button>
        ) : (
          <button className="lgin" onClick={() => handleclick("/Login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
