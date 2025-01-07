import React, { useEffect, useState } from "react";
import axios from "axios";
import getImgUrl from "../../utils/getImgUrl";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedBook, setAddedBook] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  // Load books data
  useEffect(() => {
    axios
      .get("http://localhost:5000/all-books")
      .then((result) => {
        setBooks(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Add book to the cart
  const handleAddToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingBook = cart.find((item) => item._id === book._id);

    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Set state for showing popup and trigger automatic refresh
    setAddedBook(book);
    setIsPopupVisible(true);

    // Automatically refresh the cart count after 1 second
    setTimeout(() => {
      setIsPopupVisible(false);
      window.location.reload(); // Refresh the page to update the cart count
    }, 2000); // Popup disappears after 2 seconds
  };

  // Navigate to book details page
  const handleNavigateToDetails = (bookId) => {
    navigate(`/books/${bookId}`); // This will navigate to the book detail page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Pop-Up Notification */}
      {isPopupVisible && addedBook && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {addedBook.title} added to cart!
        </div>
      )}
      <h1 className="text-3xl font-bold text-center mb-8">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books &&
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              onClick={() => handleNavigateToDetails(book._id)} // Add click event to navigate
            >
              {/* Image Section with getImgUrl */}
              <div className="h-72 w-full overflow-hidden rounded-md border border-gray-200 shadow-md">
                <img
                  src={getImgUrl(book.coverImage)} // Use getImgUrl here
                  alt={book.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{book.description}</p>
                <p className="text-red-600 line-through font-bold">
                  ${book.oldPrice}
                </p>
                <p className="text-red-600 font-bold">${book.newPrice}</p>
                <button
                  className="btn-primary px-6 space-x-1 flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from triggering book detail navigation
                    handleAddToCart(book);
                  }}
                >
                  <FiShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
