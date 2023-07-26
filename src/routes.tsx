import { lazy, useEffect } from "react";
import { Route, Navigate, useLocation, Routes } from "react-router-dom";
import { getUserLoggedIn, getActiveUser } from "./slices/userSlice";
import { useAppSelector } from "./app/hooks";
import Root from "./Root";

// Framer motion
import { AnimatePresence } from "framer-motion";

// Components | Pages
const Home = lazy(() => import("./components/pages/Home"));
const About = lazy(() => import("./components/pages/About"));
const Page404 = lazy(() => import("./components/pages/404"));
const Contact = lazy(() => import("./components/pages/Contact"));
const Settings = lazy(() => import("./components/pages/Settings"));
const GetStarted = lazy(() => import("./components/pages/GetStarted"));
const Projects = lazy(() => import("./components/pages/Projects"));
// v
const Project = lazy(() => import("./components/pages/projects/Project"));
const SelectedCardModal = lazy(
  () =>
    import(
      "./components/pages/projects/boards/cards/card-modal/SelectedCardModal"
    )
);

export const AnimatePresenceRoutes: React.FC = () => {
  const loggedIn = useAppSelector(getUserLoggedIn);
  const { userID } = useAppSelector(getActiveUser);

  const GetStartedPage = loggedIn ? (
    <Navigate replace to={`/${userID}/projects`} />
  ) : (
    <GetStarted />
  );

  const SettingsPage = loggedIn ? (
    <Settings />
  ) : (
    <Navigate replace to={"/get-started"} />
  );

  const ProjectsPage = loggedIn ? (
    <Projects />
  ) : (
    <Navigate replace to={"/get-started"} />
  );

  const ProjectPage = loggedIn ? (
    <Project />
  ) : (
    <Navigate replace to='/get-started' />
  );

  const location = useLocation();
  const locationCPY = { ...location };
  const { pathname } = locationCPY;
  const locationArr = pathname?.split("/") ?? [];
  const hasCardURL = pathname.includes("/cards/") && locationArr.length === 8;

  const customKey = hasCardURL ? locationArr.splice(4, 4).join("/") : pathname;

  useEffect(() => {
    console.log(locationCPY);

    console.log(locationArr);
    console.log(customKey);
    location.pathname = customKey;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AnimatePresence mode='wait'>
      <Routes location={locationCPY} key={customKey}>
        <Route element={<Root />}>
          <Route index path='/' element={<Home />} />
          <Route path='get-started' element={GetStartedPage} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='settings' element={SettingsPage} />

          {/* Dynamic routing for projects */}

          <Route path=':userID/projects' element={ProjectsPage} />

          {/* Direct into project's boards -> cards */}

          <Route path=':userID/projects/:projectID' element={ProjectPage}>
            {/* Direct into board's card */}
            {/* <Routes location={location} key={locationArr[4]}> */}
            <Route
              path='boards/:boardID/cards/:cardID'
              element={<SelectedCardModal />}
            />
            {/* </Routes> */}
          </Route>

          {/* Dynamic routes for boards */}

          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
