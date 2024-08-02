import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./views/Login";
import { Home } from "./views/Home";
import { Layout } from "./views/Layout";
import { Register } from "./views/Register";
import { DetailNews } from "./views/DetailNews";
import { Profile } from "./views/Profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const isLogin = localStorage.getItem("access_token");
      if (isLogin) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/news/:id",
        element: <DetailNews />,
        loader: () => {
          const isLogin = localStorage.getItem("access_token");
          if (!isLogin) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        loader: () => {
          const isLogin = localStorage.getItem("access_token");
          if (!isLogin) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);
