import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatarImg from "../assets/user.png";
import logo from "../assets/logo2.png";
import { FaCartShopping } from "react-icons/fa6";
import { FaBookMedical } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setCurrentUser(null);
    navigate("/login");
    window.location.reload();
  };

  const navigation = [
    {
      name: "All Books",
      href: "/books",
      icon: "📚",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: "👤",
    },
    ...(currentUser
      ? [
          {
            name: "Log Out",
            href: "#",
            icon: "🚪",
          },
        ]
      : []),
  ];

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-gray-900"
        }`}
      >
        <nav className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/"
                className="transition-transform duration-300 hover:scale-105"
              >
                <img src={logo} alt="Logo" className="h-16 w-auto sm:h-20" />
              </Link>
            </motion.div>

            {/* Right Side Elements */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsDropDownOpen(!isDropdownOpen)}
                      className="relative focus:outline-none"
                    >
                      <img
                        src={avatarImg}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full ring-2 ring-blue-500 hover:ring-blue-600 transition-all duration-300 shadow-lg"
                      />
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-gray-900"></span>
                    </motion.button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-3 w-56 bg-gray-800 text-white rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
                        >
                          <div className="p-4 border-b border-gray-700">
                            <p className="text-sm font-medium">
                              {currentUser.username}
                            </p>
                            <p className="text-xs text-gray-400">
                              {currentUser.email}
                            </p>
                          </div>
                          <ul className="py-2">
                            {navigation.map((item) => (
                              <motion.li
                                key={item.name}
                                whileHover={{ x: 4 }}
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
                                  className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-gray-700/50 transition-colors duration-200"
                                >
                                  <span className="text-lg">{item.icon}</span>
                                  <span>{item.name}</span>
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Cart Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/cart"
                      className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-4 rounded-lg shadow-lg transition duration-300 flex items-center space-x-2 hover:shadow-blue-500/25"
                    >
                      <FaCartShopping className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-sm font-medium">
                        Cart
                        <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full">
                          {cartCount}
                        </span>
                      </span>
                    </Link>
                  </motion.div>

                  {/* Sell Book Button */}
                  {currentUser.role === "seller" && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/Addbook"
                        className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg shadow-lg transition duration-300 flex items-center space-x-2 hover:shadow-blue-500/25"
                      >
                        <FaBookMedical className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                        <span>Sell Book</span>
                      </Link>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="flex space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition duration-300 text-sm font-medium shadow-lg hover:shadow-blue-500/25"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg transition duration-300 text-sm font-medium shadow-lg"
                    >
                      Login
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div style={{ marginTop: "80px" }}>{/* Your content here */}</div>
    </>
  );
};

export default Navbar;
