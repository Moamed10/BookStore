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
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/all-books")
      .then((response) => {
        const data = response.data;
        setBooks(data);

        const selectedBook = data.find((b) => b._id === id);
        if (selectedBook) {
          setBook(selectedBook);
        } else {
          navigate("/404");
        }
      })
      .catch(() => navigate("/error"));
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
    setIsPopupVisible(true);

    setTimeout(() => {
      setIsPopupVisible(false);
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
      {isPopupVisible && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {book.title} added to cart!
        </div>
      )}

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
