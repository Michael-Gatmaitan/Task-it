import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./components/styles/root.css";

const Root: React.FC = () => {
  return (
    <div className='root'>
      <Nav />

      <Outlet />
    </div>
  );
};

const Nav: React.FC = () => {
  interface buttons {
    centerButtons: { text: string; path: string }[];
  }

  const navBarButtons: buttons = {
    centerButtons: [
      {
        text: "Home",
        path: "/",
      },
      {
        text: "Projects",
        path: "projects",
      },
      {
        text: "Contact",
        path: "contact",
      },
      {
        text: "About",
        path: "about",
      },
      {
        text: "Settings",
        path: "settings",
      },
    ],
  };

  const location = useLocation();

  return (
    <nav>
      {/* Logo */}
      <div className='logo-container'>
        <div className='logo'></div>
        <div className='taskit-text'>Taskit</div>
      </div>

      {/* Buttons */}
      <div className='nav-buttons'>
        {navBarButtons.centerButtons.map(
          (button: { text: string; path: string }, key) => (
            <NavLink to={button.path} key={key}>
              {button.text}
            </NavLink>
          )
        )}
      </div>

      {/* Menu */}
      <div className='menu-container'></div>
      {location.pathname === "/" && (
        <div className='starting-buttons'>
          <Link to={"/"} className='default-button invicible-button'>
            Login
          </Link>
          <Link to={"/get-started"} className='default-button bordered-button'>
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Root;
