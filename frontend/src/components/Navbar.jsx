import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatrImg from "../assets/user.png";
import logo from "../assets/logo2.png";
import { FaCartShopping } from "react-icons/fa6";

const navigation = [
  { name: "all books", href: "/books" },
  { name: "Cart Page", href: "/cart" },
  { name: "profile", href: "/profile" },
  { name: "Log Out", href: "/logout" },
];

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  const navigation = [
    { name: "all books", href: "/books" },
    { name: "Cart Page", href: "/cart" },
    ...(currentUser?.role === "seller"
      ? [{ name: "Sell Book", href: "/Addbook" }]
      : []),
    { name: "Log Out", href: "/logout" },
  ];

  return (
    <div>
      <header className="bg-gray-900 text-white shadow-md">
        <nav className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-20 w-auto sm:h-24" />
            </Link>
          </div>

          <div className="flex items-center space-x-6 relative">
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropDownOpen(!isDropdownOpen)}
                  className="relative"
                >
                  <img
                    src={avatrImg}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full ring-2 ring-blue-500"
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-40"
                    style={{ top: "100%" }}
                  >
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => {
                            if (item.name === "Log Out") {
                              handleLogout();
                            } else {
                              setIsDropDownOpen(false);
                            }
                          }}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-200 rounded"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/signup"
                  className="text-sm font-medium font-primary hover:text-gray-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium font-primary hover:text-gray-300"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Cart link */}
            {currentUser && (
              <Link
                to="/cart"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:px-6 px-4 rounded-sm flex items-center"
              >
                <FaCartShopping className="text-xl" />
                <span className="text-sm font-secondary sm:ml-2 ml-1">
                  Cart
                </span>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
