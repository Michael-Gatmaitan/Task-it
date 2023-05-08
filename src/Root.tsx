import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./components/styles/root.css";

// Components
import Nav from "./root-components/Nav";
import SideBar from "./root-components/SideBar";

// Types
import type { NavButtons } from "./app/types";
import { useAppSelector } from "./app/hooks";
import { getUserLoggedIn } from "./slices/userSlice";

const Root: React.FC = () => {
  // States
  const [toggleSideBar, setToggleSideBar] = useState(false);

  const loggedIn = useAppSelector(getUserLoggedIn);

  const navBarButtons: NavButtons = {
    centerButtons: [
      {
        text: "Home",
        path: "/",
        display: "block",
      },
      {
        text: "Projects",
        path: "projects",
        display: loggedIn ? "block" : "none",
      },
      {
        text: "Contact",
        path: "contact",
        display: "block",
      },
      {
        text: "About",
        path: "about",
        display: "block",
      },
      {
        text: "Settings",
        path: "settings",
        display: "block",
      },
    ],
  };

  return (
    <div className='root'>
      <Nav
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
        navBarButtons={navBarButtons}
      />
      <SideBar
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
        navBarButtons={navBarButtons}
      />

      <Outlet />
    </div>
  );
};

export default Root;
