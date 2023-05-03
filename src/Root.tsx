import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./components/styles/root.css";

// Components
import Nav from "./root-components/Nav";
import SideBar from "./root-components/SideBar";

const Root: React.FC = () => {
  // States
  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <div className='root'>
      <Nav toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
      <SideBar
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />

      <Outlet />
    </div>
  );
};

export default Root;
