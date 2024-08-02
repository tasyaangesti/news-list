import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./views/Login";
import { Home } from "./views/Home";
import { Layout } from "./views/Layout";
import { Register } from "./views/Register";
import { DetailNews } from "./views/DetailNews";

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
          console.log(isLogin, ">ddd");

          if (!isLogin) {
            console.log(">aaa");
            return redirect("/login");
          }
          console.log(">bbb");

          return null;
        },
      },
    ],
  },
]);
