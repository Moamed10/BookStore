import React, { useEffect, useState } from "react";
import axios from "axios"; // Using axios for HTTP requests
import getImgUrl from "../../utils/getImgUrl"; // Assuming this is your utility to handle image URLs

const MyLibrary = () => {
  const [books, setBooks] = useState([]); // All books to display
  const [boughtBooks, setBoughtBooks] = useState([]); // User's bought books IDs
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // Step 1: Fetch the boughtBooks array (only the IDs) from the backend using user.id
      axios
        .get(`http://localhost:5000/user/${user.id}/bought-books`)
        .then((response) => {
          setBoughtBooks(response.data); // Save the bought books IDs
          console.log("Bought Books IDs:", response.data); // Log the bought books (IDs)
        })
        .catch((error) => {
          console.error("Error fetching bought books:", error);
          setError("An error occurred while fetching your bought books.");
        });
    } else {
      setError("User not logged in. Please log in.");
    }
  }, []); // Empty dependency array ensures this runs only once on component mount

  useEffect(() => {
    // Step 2: Fetch all books after getting boughtBooks
    if (boughtBooks.length > 0) {
      // Step 3: Fetch full details of the bought books
      axios
        .get(`http://localhost:5000/all-books`) // Get all books
        .then((response) => {
          console.log("All Books:", response.data); // Log the all-books data to check its structure

          // Step 4: Filter books based on boughtBooks IDs
          const filteredBooks = response.data.filter((book) =>
            boughtBooks.some((boughtBook) => {
              // Corrected comparison logic
              console.log(
                "Comparing book ID:",
                book._id,
                "with boughtBook ID:",
                boughtBook
              );
              return String(book._id) === String(boughtBook);
            })
          );
          setBooks(filteredBooks); // Set filtered books to state
        })
        .catch((error) => {
          console.error("Error fetching all books:", error);
          setError("An error occurred while fetching all books.");
        });
    }
  }, [boughtBooks]); // Re-run this effect when boughtBooks change

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : books.length > 0 ? (
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
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">
            No books found in your library.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
