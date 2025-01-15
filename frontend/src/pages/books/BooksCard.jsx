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
    <div>
      <div className="rounded-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
          {/* Book Cover Image (Navigates to Book Details) */}
          <div
            className="sm:h-72 sm:flex-shrink-0 border rounded-md cursor-pointer"
            onClick={handleNavigateToDetails}
          >
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="w-full bg-cover p-2 rounded-md hover:scale-105 transition-all duration-200"
            />
          </div>

          {/* Book Details */}
          <div>
            <h3
              className="text-xl font-semibold hover:text-blue-600 mb-3 cursor-pointer"
              onClick={handleNavigateToDetails}
            >
              {book.title}
            </h3>
            <p className="text-gray-600 mb-5">
              {book.description.length > 80
                ? book.description.slice(0, 80) + "..."
                : book.description}
            </p>
            <p className="font-medium mb-5">
              ${book.newPrice}{" "}
              <span className="line-through font-normal ml-2">
                ${book.oldPrice}
              </span>
            </p>
            <button
              className="btn-primary px-6 space-x-1 flex items-center gap-1"
              onClick={() => onAddToCart(book)} // Trigger the add to cart handler passed as a prop
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
