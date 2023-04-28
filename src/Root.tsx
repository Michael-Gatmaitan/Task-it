import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./components/styles/root.css";

const Root: React.FC = () => {
  return (
    <div className='root'>
      <nav>
        <div className='logo'></div>

        <div className='buttons'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='about'>About</NavLink>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Root;
