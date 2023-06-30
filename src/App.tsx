import React, { useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

// Root element
import Root from "./Root";

// Componenets | Pages
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Page404 from "./components/pages/404";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";
import Settings from "./components/pages/Settings";
import GetStarted from "./components/pages/GetStarted";
import { useAppSelector } from "./app/hooks";
import { getUserLoggedIn, getActiveUser } from "./slices/userSlice";
import { useLocalStorageUpdater } from "./app/localStorageUpdater";

// MUI StyledEngineProvider
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Project from "./components/pages/projects/Project";

const App: React.FC = () => {
  useLocalStorageUpdater();

  const loggedIn = useAppSelector(getUserLoggedIn);
  const { userID } = useAppSelector(getActiveUser);

  const users = useAppSelector((state) => state.userReducer.accounts);

  useEffect(() => {
    fetch("https://taskit-2023-default-rtdb.firebaseio.com/users.json", {
      method: "PUT",
      body: JSON.stringify(users),
    });
  }, [users]);

  /* Making a shot hand function to return where to
      direct deppends on { loggedIn } state. */
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

  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route index path='/' element={<Home />} />
        <Route path='get-started' element={GetStartedPage} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='settings' element={SettingsPage} />

        {/* Dynamic routing for projects */}
        {/* <Route path=':userID' element={<div>{username}</div>} /> */}
        <Route path=':userID/projects' element={ProjectsPage} />
        <Route path=':userID/projects/:projectID' element={ProjectPage} />

        {/* There will be boards/:boardID path, instead, boards/:boardID/cards/:cardID */}
        {/* <Route
          path=':userID/projects/:projectID/boards'
          element={ProjectPage}
        /> */}

        {/* Dynamic routes for boards */}

        <Route path='*' element={<Page404 />} />
      </Route>
    )
  );

  return (
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  );
};

export default App;
