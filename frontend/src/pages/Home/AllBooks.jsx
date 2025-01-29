import React, { useEffect, useState } from "react";
import axios from "axios";
import getImgUrl from "../../utils/getImgUrl";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { handleAddToCart } from "../../utils/handleAddToCart";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedBook, setAddedBook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("choose category");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleBooks, setVisibleBooks] = useState(8); // Visible books count
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchLabel, setSearchLabel] = useState();

  const categories = [
    "choose category",
    "Business",
    "Fiction",
    "Horror",
    "Adventure",
  ];

  const loadMore = () => {
    setVisibleBooks((prev) => prev + 4); // Increase visible books
  };

  useEffect(() => {
    const query = searchParams.get("q");
    setSearchLabel(query);

    
    axios
      .get("http://localhost:5000/all-books")
      .then((result) => {
        let booksData = result.data;
        setIsLoading(false);
        if (!query || query === "") {
          setBooks(booksData);
        } else {
          let filteredBooks = booksData.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
          );
          setBooks(filteredBooks);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [searchParams]);

  const filteredBooks =
    selectedCategory === "choose category"
      ? books
      : books.filter(
          (book) =>
            book.category &&
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleNavigateToDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Notification */}
      {isPopupVisible && addedBook && (
        <div className="fixed top-5 right-5 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          {addedBook.title} added to cart!
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Book
          </h1>
          <p className="text-gray-600 text-lg mb-12">
            Find the perfect story from our curated collection
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search for books..."
                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                onChange={(e) => {
                  const query = e.target.value;
                  setSearchParams({ q: query }); // Correctly updating search params
                }}
                value={searchLabel}
              />
            </div>

            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-3 px-4 bg-white rounded-xl shadow-sm border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Book Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.slice(0, visibleBooks).map((book) => (
                <div
                  key={book._id}
                  onClick={() => handleNavigateToDetails(book._id)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={getImgUrl(book.coverImage)}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-gray-400 line-through">
                          ${book.oldPrice}
                        </p>
                        <p className="text-2xl font-bold text-indigo-600">
                          ${book.newPrice}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(
                            book,
                            setAddedBook,
                            setIsPopupVisible
                          );
                        }}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                      >
                        <FiShoppingCart />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {visibleBooks < filteredBooks.length && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={loadMore}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
