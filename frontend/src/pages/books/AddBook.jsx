import React, { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  Tag,
  TrendingUp,
  Image as ImageIcon,
  FileCode,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const categories = ["Business", "Fiction", "Horror", "Adventure"];

const ModernAddBook = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    trending: false,
    oldPrice: "",
    newPrice: "",
    coverImage: null,
    pdfLink: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserId(decoded.id);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setNotification({ message: "User not authenticated", type: "error" });
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "coverImage" && formData[key]) {
        submitData.append(key, formData[key]);
      } else {
        submitData.append(key, formData[key]);
      }
    });
    submitData.append("authorId", userId);

    try {
      const response = await fetch("http://localhost:5000/create-book", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        setNotification({
          message: "Book added successfully",
          type: "success",
        });
        setFormData({
          title: "",
          description: "",
          category: "",
          trending: false,
          oldPrice: "",
          newPrice: "",
          coverImage: null,
          pdfLink: "",
        });
      } else {
        throw new Error("Failed to add book");
      }
    } catch (error) {
      setNotification({ message: "Error adding book", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification({ message: "", type: "" }), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FileText className="w-4 h-4" />
              Title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter book title"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FileText className="w-4 h-4" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter book description"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Tag className="w-4 h-4" />
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Trending Switch */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <label
                htmlFor="trending"
                className="text-sm font-medium text-gray-700"
              >
                Mark as Trending
              </label>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="trending"
                name="trending"
                checked={formData.trending}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label
              htmlFor="coverImage"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <ImageIcon className="w-4 h-4" />
              Cover Image
            </label>
            <input
              id="coverImage"
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* PDF Link */}
          <div className="space-y-2">
            <label
              htmlFor="pdfLink"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FileCode className="w-4 h-4" />
              PDF Link
            </label>
            <input
              id="pdfLink"
              name="pdfLink"
              value={formData.pdfLink}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter PDF link or path"
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="oldPrice"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <DollarSign className="w-4 h-4" />
                Old Price
              </label>
              <input
                id="oldPrice"
                name="oldPrice"
                type="number"
                value={formData.oldPrice}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="newPrice"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <DollarSign className="w-4 h-4" />
                New Price
              </label>
              <input
                id="newPrice"
                name="newPrice"
                type="number"
                value={formData.newPrice}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Adding Book...
              </>
            ) : (
              "Add Book"
            )}
          </button>
        </form>

        {notification.message && (
          <div
            className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
              notification.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <p>{notification.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernAddBook;
