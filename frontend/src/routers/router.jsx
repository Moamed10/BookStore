import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ContactUs from "../pages/Home/ContactUs";
import ProfilePage from "../pages/user/ProfilePage";
import BookDetail from "../pages/books/BookDetail ";
import Cart from "../pages/Home/Cart";
import AddBook from "../pages/books/AddBook";
import AllBooks from "../pages/Home/AllBooks";
import Mybooks from "../pages/books/Mybooks";
import PaymentPage from "../pages/Home/PaymentPage";
import ProtectedRoute from "./ProtectedRoute ";
import EditBook from "../pages/books/EditBook";
import ChangePassword from "../pages/user/ChangePassword ";
import MyLibrary from "../pages/books/MyLibrary";
import AboutPage from "../pages/Home/AboutPage";

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/orders", element: <div>orders</div> },
      { path: "/about", element: <div>about</div> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/books/:id", element: <BookDetail /> },
      { path: "/books", element: <AllBooks /> },
      {
        path: "/login",
        element: isLoggedIn() ? <Navigate to="/" replace /> : <Login />,
      },
      {
        path: "/signup",
        element: isLoggedIn() ? <Navigate to="/" replace /> : <Signup />,
      },
      {
        path: "/profile",
        element: isLoggedIn() ? (
          <ProfilePage />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/AddBook",
        element: (
          <ProtectedRoute roleRequired="seller">
            <AddBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/mybooks",
        element: <Mybooks />,
      },
      {
        path: "/checkout",
        element: <PaymentPage />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "/change-password",
        element: isLoggedIn() ? (
          <ChangePassword />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
      {
        path: "/my-library",
        element: <MyLibrary />,
      },
      {
        path: "/about-us",
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;
