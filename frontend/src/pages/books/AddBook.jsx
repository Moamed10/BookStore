import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios

const categories = [
  "choose category",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Get the user ID from the token in localStorage (or wherever you store it)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the JWT token
      setUserId(decoded.id); // Assuming token contains 'id' for the user
    }
  }, []);

  const onSubmit = async (data) => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("trending", data.trending);
    formData.append("oldPrice", data.oldPrice);
    formData.append("newPrice", data.newPrice);
    formData.append("coverImage", data.coverImage[0]); // File upload
    formData.append("authorId", userId); // Add the user ID to the form data

    try {
      // Send the form data using axios to the backend URL
      const response = await axios.post(
        "http://localhost:5000/create-book", // Backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the server knows it's multipart
          },
        }
      );

      if (response.status === 200) {
        setNotification({message:"Book added successfully",type:'success'})
        console.log("Book added successfully");
        // formData({title:'',description:'',category:'',trending:'',oldPrice:'',newPrice:'',coverImage:''})
      } else {
        console.error("Failed to add book");
        throw new Error("Failed to add book")
      }
    } catch (error) {
      console.error("Error adding book:", error);
      setNotification({message:"Error adding book",type:''})
    }
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 4000);
  };
  

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              placeholder="Enter book description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              name="category"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs italic">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Trending Checkbox */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="trending"
            >
              Trending
            </label>
            <input
              {...register("trending")}
              className="mr-2 leading-tight"
              type="checkbox"
              id="trending"
              name="trending"
            />
            <span className="text-sm">Mark as trending</span>
          </div>

          {/* Cover Image Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coverImage"
            >
              Cover Image
            </label>
            <input
              {...register("coverImage", {
                required: "Cover Image is required",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="coverImage"
              name="coverImage"
              type="file"
              accept="image/*"
            />
            {errors.coverImage && (
              <p className="text-red-500 text-xs italic">
                {errors.coverImage.message}
              </p>
            )}
          </div>

          {/* Old Price Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="oldPrice"
            >
              Old Price
            </label>
            <input
              {...register("oldPrice", { required: "Old price is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="oldPrice"
              name="oldPrice"
              type="number"
              placeholder="Enter old price"
            />
            {errors.oldPrice && (
              <p className="text-red-500 text-xs italic">
                {errors.oldPrice.message}
              </p>
            )}
          </div>

          {/* New Price Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPrice"
            >
              New Price
            </label>
            <input
              {...register("newPrice", { required: "New price is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPrice"
              name="newPrice"
              type="number"
              placeholder="Enter new price"
            />
            {errors.newPrice && (
              <p className="text-red-500 text-xs italic">
                {errors.newPrice.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
      {notification.message && (
        <div
          className={`mt-4 p-4 rounded-md ${
            notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AddBook;
