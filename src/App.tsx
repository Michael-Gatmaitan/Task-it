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
import { getUserLoggedIn } from "./slices/userSlice";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Task it 📔";
  }, []);

  const loggedIn = useAppSelector(getUserLoggedIn);

  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route
          path='/'
          element={
            loggedIn ? <Home /> : <Navigate replace to={"get-started"} />
          }
        />
        <Route
          path='get-started'
          element={loggedIn ? <Navigate replace to={"/"} /> : <GetStarted />}
        />
        <Route path='about' element={<About />} />
        <Route path='projects' element={<Projects />} />
        <Route path='contact' element={<Contact />} />
        <Route path='settings' element={<Settings />} />

        <Route path='*' element={<Page404 />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
