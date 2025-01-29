import React from "react";
import footerLogo from "../assets/logo2.png";

import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - More compact padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src={footerLogo} alt="Logo" className="w-32 object-contain" />
            <p className="text-gray-400 text-sm">
              "A room without books is like a body without a soul."
              <span className="block mt-1 text-gray-500">
                – Marcus Tullius Cicero
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500"></span>
            </h3>
            <ul className="grid grid-cols-1 gap-2">
              {["About-us", "Books", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight
                      size={16}
                      className="mr-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                    />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@endless.nl"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <Mail size={16} className="mr-2" />
                  info@endless.nl
                </a>
              </li>
              <li>
                <a
                  href="tel:+31102345678"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <Phone size={16} className="mr-2" />
                  +31 10 234 5678
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Blaak 16, 3011 TA
                  <br />
                  Rotterdam, Netherlands
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links & Newsletter compact version */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Follow Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500"></span>
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-transform hover:scale-110 hover:bg-blue-600"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-transform hover:scale-110 hover:bg-blue-400"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-transform hover:scale-110 hover:bg-pink-600"
              >
                <Instagram size={16} />
              </a>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Reduced padding */}
        <div className="border-t border-gray-800 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-400 text-sm">
              © {currentYear} Mo & Zahra. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
