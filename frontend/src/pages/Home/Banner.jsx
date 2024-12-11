import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import the FaSearch icon
import "../../App.css"; // Correct path (avoid absolute paths if possible)
import booksImage from "../../assets/img1.png"; // Correct relative path
import { Link } from "react-router-dom";
console.log(booksImage);

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col py-6 md:py-10 justify-center items-center gap-6 md:gap-8">
      {/* Search Bar Section */}
      <div className="w-full max-w-sm mb-4 relative">
        <input
          type="text"
          placeholder="Find Your Next Favorite Book"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Content Section (Text on the left, Image on the right) */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-4">
        {/* Text Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start mb-4 md:mb-0">
          <h1 className="md:text-3xl text-xl font-medium mb-4">
            Discover Amazing Stories
          </h1>
          <p className="mb-4">
            Dive into a world of captivating stories and timeless classics.
            Whether you're into thrillers, romance, or fantasy, we’ve got
            something for everyone.
          </p>
          <Link to="/books">
            <button className="btn-primary">Explore All Books</button>
          </Link>
        </div>

        {/* Image (Made Bigger) */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end">
          <img src={booksImage} alt="Books" className="w-96 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
