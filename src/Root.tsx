import React, { useState, lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// Components
import Nav from "./root-components/Nav";
import SideBar from "./root-components/SideBar";

// CSS styles
import "./components/styles/Nav.css";
import "./components/styles/Sidebar.css";

// Types
import type { NavButtons } from "./types/types";
import { useAppSelector } from "./app/hooks";
import { getUserLoggedIn, getActiveUser } from "./slices/userSlice";

// MUI Icons
import {
  HomeRounded as HomeIcon,
  SettingsRounded as SettingsIcon,
  DashboardRounded as ProjectsIcon,
  LogoDevRounded as ContactIcon,
  InfoRounded as AboutIcon,
  PlayCircleFilledWhiteRounded as GetStartedIcon,
} from "@mui/icons-material";

const Footer = lazy(() => import("./components/Footer"));

const Root: React.FC = () => {
  // States

  const loggedIn = useAppSelector(getUserLoggedIn);
  const activeUser = useAppSelector(getActiveUser);

  const navBarButtons: NavButtons = {
    centerButtons: loggedIn
      ? [
          {
            text: "Home",
            path: "/",
            Icon: HomeIcon,
          },
          {
            text: "Projects",
            path: `${activeUser.userID}/projects`,
            Icon: ProjectsIcon,
          },
          {
            text: "Contact",
            path: "contact",
            Icon: ContactIcon,
          },
          {
            text: "About",
            path: "about",
            Icon: AboutIcon,
          },
          {
            text: "Settings",
            path: "settings",
            Icon: SettingsIcon,
          },
        ]
      : [
          {
            text: "Home",
            path: "/",
            Icon: HomeIcon,
          },
          {
            text: "Get started",
            path: "get-started",
            Icon: GetStartedIcon,
          },
          {
            text: "Contact",
            path: "contact",
            Icon: ContactIcon,
          },
          {
            text: "About",
            path: "about",
            Icon: AboutIcon,
          },
        ],
  };

  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <>
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

      <Suspense fallback={<div className='loading-fallback'>LOADING!!!</div>}>
        <Outlet />
      </Suspense>

      <Suspense fallback={<div>Loading footer</div>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Root;
