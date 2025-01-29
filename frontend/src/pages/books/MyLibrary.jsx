import React, { useEffect, useState } from "react";
import axios from "axios";
import getImgUrl from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";

const MyLibrary = () => {
  const [books, setBooks] = useState([]);
  const [boughtBooks, setBoughtBooks] = useState([]);
  const [error, setError] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    // Dynamic welcome message based on time of day
    const getWelcomeMessage = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning, Reader!";
      if (hour < 18) return "Good Afternoon, Book Lover!";
      return "Good Evening, Literary Explorer!";
    };
    setWelcomeMessage(getWelcomeMessage());

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      axios
        .get(`http://localhost:5000/user/${user.id}/bought-books`)
        .then((response) => {
          setBoughtBooks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bought books:", error);
          setError("An error occurred while fetching your books.");
        });
    } else {
      setError("User not logged in. Please log in.");
    }
  }, []);

  useEffect(() => {
    if (boughtBooks.length > 0) {
      axios
        .get(`http://localhost:5000/all-books`)
        .then((response) => {
          const filteredBooks = response.data.filter((book) =>
            boughtBooks.some(
              (boughtBook) => String(book._id) === String(boughtBook)
            )
          );
          setBooks(filteredBooks);
        })
        .catch((error) => {
          console.error("Error fetching all books:", error);
          setError("An error occurred while fetching books.");
        });
    }
  }, [boughtBooks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-purple-500 mr-3 animate-pulse" />
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              {welcomeMessage}
            </h1>
            <Sparkles className="text-purple-500 ml-3 animate-pulse" />
          </div>

          <blockquote className="italic text-xl text-gray-600 max-w-2xl mx-auto">
            "In the world of books, every page is a portal to a new adventure."
            <span className="block text-base mt-2 text-gray-500">
              - Anonymous
            </span>
          </blockquote>
        </div>

        {error ? (
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-700 text-lg">
                You have{" "}
                <span className="font-bold text-purple-600">
                  {books.length}
                </span>{" "}
                books in your library
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-80 w-full overflow-hidden rounded-t-xl relative">
                    <img
                      src={getImgUrl(book.coverImage)}
                      alt={book.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 hover:opacity-10 transition-opacity"></div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {book.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {book.description}
                    </p>

                    <div className="flex justify-center">
                      <Link
                        target="blank"
                        to={book.pdfLink}
                        className="flex items-center justify-center 
                        bg-indigo-500 text-white px-6 py-3 rounded-full 
                        hover:bg-indigo-600 transition-colors duration-300 
                        group w-full text-center"
                      >
                        <BookOpen className="mr-3 w-6 h-6 group-hover:animate-pulse" />
                        Start Reading
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center bg-white rounded-lg shadow-md p-12">
            <p className="text-gray-600 text-xl">
              Your library is waiting to be filled with adventures.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
