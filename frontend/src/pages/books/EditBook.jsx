import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const categories = ["Business", "Fiction", "Horror", "Adventure"]; // Pre-defined categories

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate(); // Navigation to redirect after success
  const [book, setBook] = useState(null); // State to store the selected book
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    newPrice: "",
    oldPrice: "",
    category: "",
    coverImage: null, // Handle file uploads
    authorId: "", // Required field
  });

  // Fetch the book data by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/all-books`)
      .then((response) => {
        const allBooks = response.data;
        const selectedBook = allBooks.find((b) => b._id === id);

        if (selectedBook) {
          setBook(selectedBook);
          setFormData({
            title: selectedBook.title,
            description: selectedBook.description,
            newPrice: selectedBook.newPrice,
            oldPrice: selectedBook.oldPrice,
            category: selectedBook.category,
            coverImage: selectedBook.coverImage, // URL for display
            authorId: selectedBook.authorId,
          });
        } else {
          navigate("/404"); // Redirect if no book matches the ID
        }
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
        navigate("/error"); // Redirect to error page
      });
  }, [id, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes for boolean values
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle file input change for cover image
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: e.target.files[0], // Set file object
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedData.append(key, value);
    });

    axios
      .put(`http://localhost:5000/books/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Book updated:", response.data);
        navigate(`/books/${id}`); // Redirect to the updated book detail page
      })
      .catch((error) => {
        console.error("Error updating the book:", error);
      });
  };

  if (!book) {
    return <div>Loading...</div>; // Show loading state while fetching book data
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold">Edit Book</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6"
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label className="block text-lg font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold">New Price</label>
          <input
            type="number"
            name="newPrice"
            value={formData.newPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Old Price</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
