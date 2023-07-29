import { lazy, useEffect } from "react";
import { Route, Navigate, useLocation, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { setUrlIDs } from "./slices/stateSlice";
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

  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    dispatch(setUrlIDs(location.pathname));

    console.log("SET URL ID RUNNED");
  }, [dispatch, location]);

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route element={<Root />}>
          <Route index path='/' element={<Home />} />
          <Route path='get-started' element={GetStartedPage} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='settings' element={SettingsPage} />

          {/* Dynamic routing for projects */}

          <Route path=':userID/projects' element={ProjectsPage} />

          {/* Direct into project's boards -> cards */}

          <Route path=':userID/projects/:projectID' element={ProjectPage} />
          {/* Direct into board's card */}
          {/* <Routes location={location} key={locationArr[4]}> */}

          {/* Dynamic routes for boards */}

          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
