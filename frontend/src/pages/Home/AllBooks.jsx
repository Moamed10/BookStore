import React, { useEffect, useState } from "react";
import axios from "axios";
import getImgUrl from "../../utils/getImgUrl"; // Import getImgUrl
import { Link } from "react-router-dom"; // Import Link for navigation
import Search from "../../components/Search";
import { useSearchParams } from "react-router-dom";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');

    // Get all books 
    axios.get("http://localhost:5000/all-books")
      .then((result) => {
        let booksData = result.data;

        if(!query || query === "") {
          // Set All Books
          setBooks(booksData);
        } else {
          // Filter books by search query
          let filteredBooks = booksData.filter( book => {
            console.log(1, book.title.toLowerCase())
            console.log(2, query.toLowerCase());
            return book.title.toLowerCase().includes(query.toLowerCase())
          });
          console.log(filteredBooks)
          setBooks(filteredBooks);
        }

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="books-title-search">
        <h1 className="text-3xl font-bold text-center mb-8">All Books</h1>
        <Search />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books &&
          books.map((book) => (
            <Link
              key={book._id}
              to={`/books/${book._id}`} // Make each book clickable and navigate to its detail page
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
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
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
