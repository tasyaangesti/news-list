import { createBrowserRouter } from "react-router-dom";
import { Login } from "./views/Login";
import { Home } from "./views/Home";
import { Layout } from "./views/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  { element: <Layout />, children: [{ path: "/", element: <Home /> }] },
]);
