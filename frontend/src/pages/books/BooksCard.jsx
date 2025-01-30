import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import getImgUrl from "../../utils/getImgUrl";
import { useNavigate } from "react-router-dom";

const BooksCard = ({ book, onAddToCart }) => {
  const navigate = useNavigate();

  const handleNavigateToDetails = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Enhanced Book Cover Container */}
        <div
          className="flex-shrink-0 w-48 sm:w-40 mx-auto sm:mx-0 cursor-pointer perspective-1000 group"
          onClick={handleNavigateToDetails}
        >
          <div
            className="aspect-[2/3] relative rounded-lg shadow-md 
            transform-gpu group-hover:-translate-y-2 group-hover:rotate-2 
            group-hover:shadow-lg transition-all duration-300 ease-out"
          >
            {/* Enhanced Spine Effect */}
            <div
              className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 
              rounded-l-lg transform -skew-y-12"
            />

            {/* Enhanced Pages Effect */}
            <div
              className="absolute -right-1 top-0 w-2 h-full bg-gray-100 transform skew-y-12 
              group-hover:bg-gradient-to-b from-gray-50 via-white to-gray-50"
            />

            {/* Book Cover with Enhanced Shadow */}
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg 
                shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]"
            />

            {/* Premium Hover Effects */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 
              group-hover:opacity-100 rounded-lg transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Enhanced Book Details */}
        <div className="flex flex-col justify-between flex-grow space-y-6 sm:py-2">
          <div className="space-y-4">
            <h3
              className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer 
                line-clamp-2 transition-colors duration-200 group-hover:text-blue-600"
              onClick={handleNavigateToDetails}
            >
              {book.title}
            </h3>
            <p className="text-gray-600 line-clamp-3 leading-relaxed tracking-wide">
              {book.description.length > 150
                ? book.description.slice(0, 150) + "..."
                : book.description}
            </p>
          </div>

          <div className="space-y-5">
            {/* Enhanced Price Display */}
            <div className="flex items-baseline space-x-3">
              <span
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 
                bg-clip-text text-transparent"
              >
                ${book.newPrice}
              </span>
              <span className="text-lg text-gray-400 line-through decoration-2">
                ${book.oldPrice}
              </span>
            </div>

            {/* Enhanced Button */}
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                px-8 py-3 rounded-lg flex items-center justify-center gap-3 
                shadow-sm hover:shadow-md transition-all duration-200 
                hover:translate-y-px active:translate-y-1"
              onClick={() => onAddToCart(book)}
            >
              <FiShoppingCart className="text-lg" />
              <span className="font-medium tracking-wide">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
