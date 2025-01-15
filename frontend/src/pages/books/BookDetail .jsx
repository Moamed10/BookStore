import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getImgUrl from "../../utils/getImgUrl";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";

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

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingBook = cart.find((item) => item._id === book._id);

    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Set state for showing popup
    setAddedBook(book);
    setIsPopupVisible(true);

    // Refresh the page after adding a book to the cart using window.location.reload
    setTimeout(() => {
      setIsPopupVisible(false);
      window.location.reload(false); // Refreshes the page
    }, 2000); // Popup disappears after 2 seconds
  };

  const recommendedBooks =
    book && books.length > 0
      ? books.filter(
          (b) =>
            b.category &&
            b.category.toLowerCase() === book.category.toLowerCase() &&
            b._id !== book._id
        )
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
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Recommended Books */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Recommended Books</h2>
        {recommendedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedBooks.map((recommendedBook) => (
              <div
                key={recommendedBook._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={getImgUrl(recommendedBook.coverImage)}
                  alt={recommendedBook.title}
                  className="w-full h-56 object-cover object-center"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {recommendedBook.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {recommendedBook.description}
                  </p>
                  <p className="text-red-600 line-through font-bold">
                    ${recommendedBook.oldPrice}
                  </p>
                  <p className="text-red-600 font-bold">
                    ${recommendedBook.newPrice}
                  </p>
                  <button
                    className="btn-primary px-6 space-x-1 flex items-center gap-1"
                    onClick={() => handleAddToCart(recommendedBook)}
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
