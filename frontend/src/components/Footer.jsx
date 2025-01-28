import React from "react";
import footerLogo from "../assets/logo2.png";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Tagline */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <img
            src={footerLogo}
            alt="Logo"
            className="mb-4 mx-auto md:mx-0 w-36"
          />
          <p className="text-gray-400 text-sm">
            "A room without books is like a body without a soul." – Marcus
            Tullius Cicero
          </p>
        </div>

        {/* Right Side - Navigation Links */}
        <div className="md:w-1/2 w-full text-center">
          <ul className="flex justify-center md:justify-end gap-6">
            <li>
              <a href="#home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Social Media */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <span className="text-gray-400">Follow us:</span>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Right Side - Copyright */}
        <p className="text-gray-400 text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} Mo & Zahra. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
