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
import { getUserLoggedIn, logoutUser } from "./slices/userSlice";
import { useLocalStorageUpdater } from "./app/localStorageUpdater";

const App: React.FC = () => {
  useLocalStorageUpdater();

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Task it 📔";

    document.body.onload = () => {
      dispatch(logoutUser());
    };
    // Make sure on every log in or reload, there's no active user
    // and loggedIn is false.
  });

  const loggedIn = useAppSelector(getUserLoggedIn);

  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route index path='/' element={<Home />} />
        <Route
          path='get-started'
          element={
            loggedIn ? <Navigate replace to={"/projects"} /> : <GetStarted />
          }
        />
        <Route
          path='projects'
          element={
            loggedIn ? <Projects /> : <Navigate replace to={"/get-started"} />
          }
        />

        <Route path='about' element={<About />} />

        <Route path='contact' element={<Contact />} />

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
