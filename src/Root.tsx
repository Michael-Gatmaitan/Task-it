import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";

// Components
import Nav from "./root-components/Nav";
import SideBar from "./root-components/SideBar";

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

import LoadingComponent from "./components/loading-component/index";

// const Footer = lazy(() => import("./components/Footer"));

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

      {toggleSidebar ? (
        <SideBar
          navBarButtons={navBarButtons}
          setToggleSidebar={setToggleSidebar}
        />
      ) : null}

      <Suspense fallback={<LoadingComponent />}>
        <Outlet />
      </Suspense>

      {/* <Suspense fallback={<div>Loading footer</div>}>
        <Footer />
      </Suspense> */}
    </>
  );
};

export default Root;
