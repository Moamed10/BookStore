import React, { useEffect, useState } from "react";
import BooksCard from "../books/BooksCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { handleAddToCart } from "../../utils/handleAddToCart";
import { ShoppingCart } from "lucide-react";

const categories = [
  "choose category",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("choose category");
  const [notification, setNotification] = useState({
    visible: false,
    book: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/all-books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleBookAddToCart = async (book) => {
    await handleAddToCart(
      book,
      (addedBook) => {
        setNotification({ visible: true, book: addedBook });
        setTimeout(() => setNotification({ visible: false, book: null }), 3000);
      },
      () => {}
    );
  };

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
    <div className="py-10 relative">
      {/* Notification */}
      {notification.visible && notification.book && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 transform transition-all duration-300">
            <ShoppingCart className="w-5 h-5" />
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm">
                {notification.book.title} has been added
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-6">Most Selling</h1>

        {/* Category filtering */}
        <div className="flex items-center">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category"
            id="category"
            className="border bg-[#EAEAEA] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filterBooks.length > 0 ? (
        <Swiper
          slidesPerView={1}
          navigation={true}
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
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filterBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BooksCard
                book={book}
                onAddToCart={() => handleBookAddToCart(book)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No books available in this category.</p>
        </div>
      )}
    </div>
  );
};

export default TopSellers;
