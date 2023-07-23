import React, { lazy } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

// Root element
import Root from "./Root";
import { useAppSelector } from "./app/hooks";
import { getUserLoggedIn, getActiveUser } from "./slices/userSlice";
import { useLocalStorageUpdater } from "./app/localStorageUpdater";

// Framer motion
import { AnimatePresence } from "framer-motion";

// MUI StyledEngineProvider
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

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

/*
  --- Home /
    - About /about
    - Contact /contact
    - Settings /settings
    - Projects /projects
      - Project /projects/:projectID
        * Displays boards * - Boards
      - CardPage as Modal /projects/:projectID/boards/:boardID/cards/:cardID
*/

const App: React.FC = () => {
  // Custom hooks we need if some data is changed;.
  useLocalStorageUpdater();
  // const users = useAppSelector((state) => state.userReducer.accounts);

  // firebase realtime database
  // useEffect(() => {
  //   fetch("https://taskit-2023-default-rtdb.firebaseio.com/users.json", {
  //     method: "PUT",
  //     body: JSON.stringify(users),
  //   });
  // }, [users]);

  /* Making a short hand function to return where to
      direct depends on { loggedIn } state. */

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

        <Route path=':userID/projects' element={ProjectsPage} />

        {/* Direct into project's boards -> cards */}
        <Route path=':userID/projects/:projectID' element={ProjectPage}>
          {/* Direct into board's card */}
          <Route
            path='boards/:boardID/cards/:cardID'
            element={<SelectedCardModal />}
          />
        </Route>

        {/* Dynamic routes for boards */}

        <Route path='*' element={<Page404 />} />
      </Route>
    )
  );

  return (
    <StyledEngineProvider injectFirst>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    </StyledEngineProvider>
  );
};

export default App;
