import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  // Navigate,
  // redirect,
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

const App: React.FC = () => {
  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route
          path='/'
          // element={
          //   isLoggedin ? <Home /> : <Navigate replace to={"get-started"} />
          // }
          element={<Home />}
        />
        <Route
          path='get-started'
          // element={
          //   isLoggedin ? <Navigate replace to={"/"} /> : <GetStarted />
          // }
          element={<GetStarted />}
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
