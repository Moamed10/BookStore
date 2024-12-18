import React, { useEffect, useState } from 'react';
import axios from 'axios';




export default function AllBooks() {
  const [books,setBooks]=useState();

  useEffect(()=>{
    axios.get('http://localhost:5000/all-books')
    .then(result =>{
        console.log(result.data)
        setBooks(result.data)
        
    })
    .catch(err =>{
      console.log(err)
    })
  },[])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">All books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books && books.map(book => (
          <div key={book._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300" >
            <img
              src={`http://localhost:5000/all-books/uploads/${book.coverImage}`}
              alt={book.title}
              className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{book.description}</p>
              <p className="text-red-600 line-through font-bold">${book.oldPrice}</p>
              <p className="text-red-600 font-bold">${book.newPrice}</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-4" >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );

    }