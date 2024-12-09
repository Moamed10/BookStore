import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "/orders",
        element: <div> orders</div>,
      },
      {
        path: "/about",
        element: <div> about </div>,
      },
    ],
  },
]);

export default router;
