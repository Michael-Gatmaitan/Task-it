import React from "react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Root element

import { useLocalStorageUpdater } from "./app/localStorageUpdater";

// MUI StyledEngineProvider
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { AnimatePresenceRoutes } from "./routes";

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
  const routerWithFramer = createBrowserRouter(
    createRoutesFromElements(
      <Route path='*' element={<AnimatePresenceRoutes />} />
    )
  );

  return (
    <StyledEngineProvider injectFirst>
      <RouterProvider router={routerWithFramer} />
    </StyledEngineProvider>
  );
};

export default App;
