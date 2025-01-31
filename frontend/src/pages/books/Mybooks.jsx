import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getImgUrl from "../../utils/getImgUrl";
import { Trash2, Edit2, BookOpen, Loader, Plus, Book } from "lucide-react";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const authorIdFromStorage = JSON.parse(localStorage.getItem("user"))?.id;
    setLoading(true);
    axios
      .get(`http://localhost:5000/all-books`)
      .then((response) => {
        const filteredBooks = response.data.filter(
          (book) => book.authorId === authorIdFromStorage
        );
        setBooks(filteredBooks);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        showNotification("Failed to load books. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

  const handleDelete = (bookId) => {
    setDeleteConfirm(null);
    axios
      .delete(`http://localhost:5000/books/${bookId}`)
      .then(() => {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
        showNotification("Book successfully deleted");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        showNotification("Failed to delete book. Please try again.", "error");
      });
  };

  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleAddNew = () => {
    navigate("/AddBook");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader className="w-12 h-12 animate-spin text-blue-600" />
            <div className="absolute inset-0 animate-pulse bg-blue-100 rounded-full blur-xl opacity-50"></div>
          </div>
          <p className="text-gray-600 animate-pulse">
            Loading your collection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 transform transition-all duration-500 ease-out ${
            notification.show
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          } ${notification.type === "error" ? "bg-red-500" : "bg-green-500"}`}
        >
          <div className="flex items-center space-x-2 text-white px-6 py-3 rounded-lg shadow-lg">
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 transform transition-all shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Confirm Delete</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this book? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Books</h1>
            <p className="text-gray-600">Manage your book collection</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Book className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 font-medium">
                {books.length} Books
              </span>
            </div>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-5 h-5" />
              <span>Add Book</span>
            </button>
          </div>
        </div>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={getImgUrl(book.coverImage)}
                      alt={book.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 inset-x-4">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleEdit(book._id)}
                          className="p-2 bg-white rounded-lg shadow-lg hover:bg-blue-50 transition-colors transform hover:scale-105"
                        >
                          <Edit2 className="w-5 h-5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(book._id)}
                          className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 transition-colors transform hover:scale-105"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {book.description}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm text-gray-400 line-through">
                      ${book.oldPrice}
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      ${book.newPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Books Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start building your book collection today.
            </p>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Book</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
