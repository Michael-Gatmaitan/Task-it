import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// Components
import Nav from "./root-components/Nav";
import SideBar from "./root-components/SideBar";

// CSS styles
import "./components/styles/Nav.css";
import "./components/styles/Sidebar.css";

// Types
import type { NavButtons } from "./app/types";
import { useAppSelector } from "./app/hooks";
import { getUserLoggedIn } from "./slices/userSlice";

const Root: React.FC = () => {
  // States

  const loggedIn = useAppSelector(getUserLoggedIn);

  const navBarButtons: NavButtons = {
    centerButtons: loggedIn
      ? [
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
        ]
      : [
          {
            text: "Home",
            path: "/",
          },
          {
            text: "Get started",
            path: "get-started",
          },
          {
            text: "Contact",
            path: "contact",
          },
          {
            text: "About",
            path: "about",
          },
        ],
  };

  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className='root'>
      <Nav
        navBarButtons={navBarButtons}
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />

      <SideBar
        navBarButtons={navBarButtons}
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />

      <Outlet />
    </div>
  );
};

export default Root;
