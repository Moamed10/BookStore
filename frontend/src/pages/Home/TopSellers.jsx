// TopSellers.js
import React, { useEffect, useState } from "react";
import BooksCard from "../books/BooksCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { handleAddToCart } from "../../utils/handleAddToCart"; // Import the function

const categories = [
  "choose category", // Optional placeholder
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("choose category");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedBook, setAddedBook] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/all-books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Filter books based on selected category
  const filterBooks =
    selectedCategory === "choose category"
      ? books
      : books.filter(
          (book) =>
            book.category &&
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold mb-6">Most Selling</h1>
      {/* Category filtering */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Popup Notification */}
      {isPopupVisible && addedBook && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {addedBook.title} added to cart!
        </div>
      )}

      <Swiper
        slidesPerView={1}
        navigation={true} // This will automatically add left and right arrows
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]} // Use the navigation module
        className="mySwiper"
      >
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
        {filterBooks.length > 0 &&
          filterBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BooksCard
                book={book}
                onAddToCart={(book) => {
                  handleAddToCart(book, setAddedBook, setIsPopupVisible); // Call the function
                }}
              />
            </SwiperSlide>
          ))}
          </div>
      </Swiper>
    </div>
  );
};

export default TopSellers;
