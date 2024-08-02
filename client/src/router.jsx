import { createBrowserRouter } from "react-router-dom";
import { Login } from "./views/Login";
import { Home } from "./views/Home";
import { Layout } from "./views/Layout";
import { Register } from "./views/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { element: <Layout />, children: [{ path: "/", element: <Home /> }] },
]);
