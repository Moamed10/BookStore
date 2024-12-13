import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ContactUs from "../pages/Home/ContactUs";
import BookDetail from "../pages/books/BookDetail ";
import AddBook from "../pages/books/AddBook";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <div> orders</div>,
      },
      {
        path: "/about",
        element: <div> about </div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/books/:id",
        element: <BookDetail />, // The BookDetail component will render for this route
      },
      {
        path: "/AddBook",
        element: <AddBook />,
      },
    ],
  },
]);

export default router;
