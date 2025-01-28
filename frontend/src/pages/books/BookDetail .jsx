import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getImgUrl from "../../utils/getImgUrl";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";

// Import the handleAddToCart function
import { handleAddToCart } from "../../utils/handleAddToCart";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedBook, setAddedBook] = useState(null);

  useEffect(() => {
    // Load all books data
    axios
      .get("http://localhost:5000/all-books")
      .then((result) => {
        setBooks(result.data);
        const selectedBook = result.data.find((b) => b._id === id);
        if (selectedBook) {
          setBook(selectedBook);
        } else {
          navigate("/404"); // If book is not found, redirect to 404 page
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error"); // Redirect to error page in case of failure
      });
  }, [id, navigate]);

  // Recommended books based on category
  const recommendedBooks =
    book && books.length > 0
      ? books
          .filter(
            (b) =>
              b.category &&
              b.category.toLowerCase() === book.category.toLowerCase() &&
              b._id !== book._id
          )
          .slice(0, 4) // Limit to a maximum of 4 books
      : [];

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      {/* Pop-Up Notification */}
      {isPopupVisible && addedBook && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {addedBook.title} added to cart!
        </div>
      )}

      {/* Book Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex justify-start">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="max-w-xs w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-lg text-gray-600">{book.description}</p>
          <h6 className="text-2xl font-semibold">${book.newPrice}</h6>
          <button
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            onClick={() =>
              handleAddToCart(book, setAddedBook, setIsPopupVisible)
            }
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Recommended Books */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Recommended Books</h2>
        {recommendedBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendedBooks.map((recommendedBook) => (
              <div
                key={recommendedBook._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col items-center"
              >
                <img
                  src={getImgUrl(recommendedBook.coverImage)}
                  alt={recommendedBook.title}
                  className="w-full h-60 object-cover object-center"
                />
                <div className="p-2 text-center">
                  <h2 className="text-sm font-semibold mb-1 text-gray-800">
                    {recommendedBook.title}
                  </h2>
                  <p className="text-xs text-gray-600 mb-1">
                    {recommendedBook.description.length > 50
                      ? `${recommendedBook.description.slice(0, 50)}...`
                      : recommendedBook.description}
                  </p>
                  <p className="text-xs text-red-600 line-through font-bold">
                    ${recommendedBook.oldPrice}
                  </p>
                  <p className="text-sm text-red-600 font-bold">
                    ${recommendedBook.newPrice}
                  </p>
                  <button
                    className="btn-primary mt-2 px-4 py-2 text-sm flex items-center gap-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() =>
                      handleAddToCart(
                        recommendedBook,
                        setAddedBook,
                        setIsPopupVisible
                      )
                    }
                  >
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recommended books available.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
