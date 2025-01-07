import React, { useState } from "react";
import "../../App.css"; // Correct path (avoid absolute paths if possible)
import booksImage from "../../assets/img1.png"; // Correct relative path
import { Link } from "react-router-dom";
import  Search  from "../../components/Search";

console.log(booksImage);

const Banner = () => {
// const [results,setResults] =useState([])

  return (
    <div className="flex flex-col py-6 md:py-10 justify-center items-center gap-6 md:gap-8">
      {/* Search Bar Section */}
      <Search/>

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
