import React, { useEffect, useState } from "react";
import BooksCard from "../books/BooksCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

const categories = [
  "choose category",
  "Business",
  "fiction",
  "Horror",
  "Adventure",
];

const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("choose category");
  useEffect(() => {
    fetch("Books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filterbooks =
    selectedCategory === "choose category"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLocaleLowerCase()
        );

  console.log(filterbooks);

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
        {filterbooks.length > 0 &&
          filterbooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BooksCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
