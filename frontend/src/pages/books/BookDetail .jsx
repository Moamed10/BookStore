import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getImgUrl from "../../utils/getImgUrl";
import BooksCard from "../books/BooksCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Books.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        const selectedBook = data.find((b) => b._id === parseInt(id));
        if (selectedBook) {
          setBook(selectedBook);
        } else {
          navigate("/404");
        }
      })
      .catch(() => navigate("/error"));
  }, [id, navigate]);

  const recommendedBooks = book
    ? books.filter(
        (b) => b.category.toLowerCase() === book.category.toLowerCase()
      )
    : [];

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex justify-start">
          <img
            src={getImgUrl(book.coverImage) || "/path/to/default-image.jpg"}
            alt={book.title}
            className="max-w-xs w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-lg text-gray-600">{book.description}</p>
          <h6 className="text-2xl font-semibold">${book.newPrice}</h6>
          <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Recommended Books</h2>
        <Swiper
          slidesPerView={1}
          navigation={true}
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
          {recommendedBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BooksCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookDetail;
