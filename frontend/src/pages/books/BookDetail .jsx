import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getImgUrl from "../../utils/getImgUrl";
import BooksCard from "../books/BooksCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams(); // Book ID from the URL
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all books from the backend using axios
    axios
      .get("http://localhost:5000/all-books")
      .then((response) => {
        const data = response.data;
        setBooks(data);

        // Find the book with the matching ID
        const selectedBook = data.find((b) => b._id === id);
        if (selectedBook) {
          setBook(selectedBook);
        } else {
          navigate("/404"); // Navigate to a 404 page if the book is not found
        }
      })
      .catch(() => navigate("/error")); // Navigate to an error page in case of an API failure
  }, [id, navigate]);

  // Filter books in the same category for recommendations
  const recommendedBooks =
    book && books.length > 0
      ? books.filter(
          (b) =>
            b.category &&
            b.category.toLowerCase() === book.category.toLowerCase() &&
            b._id !== book._id // Exclude the current book
        )
      : [];
  console.log("Book:", book);
  console.log("Recommended Books:", recommendedBooks);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      {/* Book Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Book Image */}
        <div className="flex justify-start">
          <img
            src={getImgUrl(book.coverImage)} // Use the updated getImgUrl function
            alt={book.title}
            className="max-w-xs w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Book Info */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-lg text-gray-600">{book.description}</p>
          <h6 className="text-2xl font-semibold">${book.newPrice}</h6>
          <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Recommended Books Section */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Recommended Books</h2>
        {recommendedBooks.length > 0 ? (
          <Swiper
            slidesPerView={1}
            navigation
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 40 },
              1180: { slidesPerView: 3, spaceBetween: 40 },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {recommendedBooks.map((recommendedBook) => (
              <SwiperSlide key={recommendedBook._id}>
                <BooksCard book={recommendedBook} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-600">No recommended books available.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
