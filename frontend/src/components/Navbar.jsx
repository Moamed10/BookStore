import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import avatrImg from "../assets/user.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "orders", href: "/orders" },
  { name: "car page ", href: "/cart" },
  { name: "check out", href: "/checkout" },
];

const Navbar = () => {
  const currentuser = true;
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div>
      <header className="max-w-screen-2xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center md:gap-16 gap-4">
            {/* Menu icon */}
            <Link to="/">
              <FaBars className="size-6" />
            </Link>

            {/* Search bar container */}
            <div className="relative sm:w-72 w-40">
              <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-[#EAEAEA] w-full py-2 pl-10 pr-4 rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="relative flex items-center md:space-x-3 space-x-2">
            {currentuser ? (
              <>
                <button
                  onClick={() => setIsDropDownOpen(!isDropdownOpen)}
                  className="relative"
                >
                  <img
                    src={avatrImg}
                    alt="User Avatar"
                    className={`size-7 rounded-full ${
                      currentuser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40"
                    style={{ top: "100%" }}
                  >
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropDownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
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
              <Link to="/login">
                <FaRegUser className="size-6" />
              </Link>
            )}
            <button className="hidden sm:block">
              <FaHeart className="size-6" />
            </button>
            <Link
              to="/cart"
              className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
            >
              <FaCartShopping />
              <span className="text-sm font-semibold sm:ml-1">0</span>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
