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
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  getActiveUser,
  getUserLoggedIn,
  setLoggedIn,
} from "./slices/userSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector(getActiveUser);

  useEffect(() => {
    document.title = "Task it 📔";

    if (activeUser.username !== "") {
      dispatch(setLoggedIn(true));
    }
  }, []);

  const loggedIn = useAppSelector(getUserLoggedIn);

  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route path='/' element={<Home />} />
        <Route
          path='get-started'
          element={
            loggedIn ? <Navigate replace to={"/projects"} /> : <GetStarted />
          }
        />
        <Route
          path='about'
          element={
            loggedIn ? <About /> : <Navigate replace to={"/get-started"} />
          }
        />
        <Route
          path='projects'
          element={
            loggedIn ? <Projects /> : <Navigate replace to={"/get-started"} />
          }
        />
        <Route
          path='contact'
          element={
            loggedIn ? <Contact /> : <Navigate replace to={"/get-started"} />
          }
        />
        <Route
          path='settings'
          element={
            loggedIn ? <Settings /> : <Navigate replace to={"/get-started"} />
          }
        />

        <Route path='*' element={<Page404 />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
