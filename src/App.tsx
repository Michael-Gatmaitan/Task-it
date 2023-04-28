import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Root element
import Root from "./Root";

// Componenets | Pages
import Home from "./components/Home";
import About from "./components/About";

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
