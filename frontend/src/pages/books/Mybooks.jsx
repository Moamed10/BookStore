import React, { useEffect, useState } from "react";
import axios from "axios";
import getImgUrl from "../../utils/getImgUrl";

const MyBooks = () => {
  const [books, setBooks] = useState([]);

  // Fetch all books
  useEffect(() => {
    console.log("Local Storage Content:", { ...localStorage });

    const authorIdFromStorage = JSON.parse(localStorage.getItem("user"))?.id;
    console.log("Author ID from LocalStorage:", authorIdFromStorage); // Ensure it's correctly fetched

    // Fetch all books from backend
    axios
      .get(`http://localhost:5000/all-books`) // Updated endpoint to fetch all books
      .then((response) => {
        console.log("Fetched Books:", response.data); // Log the fetched books

        // Filter books based on authorId from localStorage
        const filteredBooks = response.data.filter(
          (book) => book.authorId === authorIdFromStorage
        );
        console.log("Filtered Books:", filteredBooks); // Log the filtered books
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
          // Update UI by removing the deleted book
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
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 mt-4 w-full"
                >
                  Delete Book
                </button>
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
