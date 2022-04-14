import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import "./navbar.css";

export const NavBar = () => {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const { onLogout } = useAuth();
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/dashboard" className="nav-logo">
            Notice Bee 🐝
            <i class="fa-solid fa-clipboard"></i>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={(navData) =>
                  navData.isActive ? "active" : "nav-links"
                }
                onClick={click ? handleClick : null}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin"
                className={(navData) =>
                  navData.isActive ? "active" : "nav-links"
                }
                onClick={click ? handleClick : null}
              >
                Admin
              </NavLink>
            </li>
            <li className="nav-item logout_item">
              <NavLink to={location.pathname} onClick={onLogout}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                &nbsp;Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
};
