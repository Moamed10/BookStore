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
import ProtectedRoute from "./ProtectedRoute "; // This can be used for specific role-based protections

// Function to check if the user is logged in (i.e., token is available in localStorage)
const isLoggedIn = () => {
  return !!localStorage.getItem("token");
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

      // Login Route: If already logged in, redirect to home
      {
        path: "/login",
        element: isLoggedIn() ? <Navigate to="/" replace /> : <Login />,
      },

      // Signup Route: If already logged in, redirect to home
      {
        path: "/signup",
        element: isLoggedIn() ? <Navigate to="/" replace /> : <Signup />,
      },

      // Profile Route: Only accessible by logged-in users
      {
        path: "/profile",
        element: isLoggedIn() ? (
          <ProfilePage />
        ) : (
          <Navigate to="/login" replace />
        ),
      },

      // Cart Route: Protected route (only accessible if the user is logged in)
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      // Protected AddBook route (only accessible by sellers)
      {
        path: "/AddBook",
        element: (
          <ProtectedRoute roleRequired="seller">
            <AddBook />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
