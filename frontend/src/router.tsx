import {createBrowserRouter} from "react-router-dom";
import {loginRoute} from "./pages/Login.tsx";
import {appLayoutRoute} from "./pages/Layout.tsx";

export const router = createBrowserRouter([
  loginRoute,
  Object.assign({}, appLayoutRoute, {
    children: [
      {index: true, Component: () => <p>Dashboard</p>},
      {path: 'profile', Component: () => <p>Profile</p>}
    ]
  }),
]);
