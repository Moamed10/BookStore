import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import getImgUrl from "../../utils/getImgUrl";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch all books
  useEffect(() => {
    const authorIdFromStorage = JSON.parse(localStorage.getItem("user"))?.id;

    // Fetch all books from the backend
    axios
      .get(`http://localhost:5000/all-books`)
      .then((response) => {
        // Filter books based on authorId from localStorage
        const filteredBooks = response.data.filter(
          (book) => book.authorId === authorIdFromStorage
        );
        setBooks(filteredBooks); // Set the filtered books in the state
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Handle delete book
  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`http://localhost:5000/books/${bookId}`)
        .then(() => {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book._id !== bookId)
          );
          alert("Book deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          alert("Failed to delete book. Please try again.");
        });
    }
  };

  // Handle edit book
  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`); // Navigate to the EditBook page with the bookId
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              {/* Book Cover */}
              <div className="h-72 w-full overflow-hidden rounded-md border border-gray-200 shadow-md">
                <img
                  src={getImgUrl(book.coverImage)}
                  alt={book.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Book Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{book.description}</p>
                <p className="text-red-600 line-through font-bold">
                  ${book.oldPrice}
                </p>
                <p className="text-red-600 font-bold">${book.newPrice}</p>
                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
