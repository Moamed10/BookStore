import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getImgUrl from "../../utils/getImgUrl";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";
import { handleAddToCart } from "../../utils/handleAddToCart";
import { ShoppingCart } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [addedBook, setAddedBook] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/all-books")
      .then((result) => {
        setBooks(result.data);
        const selectedBook = result.data.find((b) => b._id === id);
        if (selectedBook) {
          setBook(selectedBook);
        } else {
          navigate("/404");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, [id, navigate]);

  const handleBookAdd = async (bookToAdd) => {
    await handleAddToCart(bookToAdd, setAddedBook, setShowNotification);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const recommendedBooks =
    book && books.length > 0
      ? books
          .filter(
            (b) =>
              b.category?.toLowerCase() === book.category?.toLowerCase() &&
              b._id !== book._id
          )
          .slice(0, 4)
      : [];

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Custom Notification */}
      {showNotification && addedBook && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 flex items-center space-x-3">
          <ShoppingCart className="h-5 w-5" />
          <div>
            <p className="font-semibold">Added to Cart!</p>
            <p className="text-sm">{addedBook.title} has been added</p>
          </div>
        </div>
      )}

      {/* Book Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="flex justify-center md:justify-start">
          <div className="relative group">
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="w-full max-w-sm h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {book.description}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-blue-600">
              ${book.newPrice}
            </span>
            {book.oldPrice && (
              <span className="text-xl text-gray-400 line-through">
                ${book.oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => handleBookAdd(book)}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          You May Also Like
        </h2>
        {recommendedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedBooks.map((recommendedBook) => (
              <div
                key={recommendedBook._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={getImgUrl(recommendedBook.coverImage)}
                    alt={recommendedBook.title}
                    className="w-full h-50 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">
                    {recommendedBook.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {recommendedBook.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400 line-through">
                        ${recommendedBook.oldPrice}
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        ${recommendedBook.newPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookAdd(recommendedBook)}
                      className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No similar books available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
