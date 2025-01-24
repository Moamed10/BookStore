import React from "react";
import { useNavigate } from "react-router-dom";
import { Book, LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 shadow-2xl rounded-xl p-8 md:p-10">
        <h2 className="text-3xl font-serif text-center text-white mb-10 border-b border-gray-700 pb-4">
          Profile
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-700 rounded-md border-l-4 border-blue-500">
            <label className="text-lg font-serif text-gray-300 mb-2 md:mb-0">
              Username
            </label>
            <p className="text-lg text-white">{user.username}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-700 rounded-md border-l-4 border-green-500">
            <label className="text-lg font-serif text-gray-300 mb-2 md:mb-0">
              Email
            </label>
            <p className="text-lg text-white">{user.email}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-700 rounded-md border-l-4 border-purple-500">
            <label className="text-lg font-serif text-gray-300 mb-2 md:mb-0">
              Role
            </label>
            <p className="text-lg text-white capitalize">{user.role}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate("/my-library")}
            className="w-full flex items-center justify-center py-3 px-6 
            bg-indigo-600 text-white font-serif text-lg rounded-md 
            hover:bg-indigo-700 transition-colors duration-200 
            shadow-md space-x-3"
          >
            <Book className="w-6 h-6" />
            <span>My Library</span>
          </button>

          {user.role === "seller" && (
            <button
              onClick={() => navigate("/mybooks")}
              className="w-full flex items-center justify-center py-3 px-6 
              bg-blue-600 text-white font-serif text-lg rounded-md 
              hover:bg-blue-700 transition-colors duration-200 
              shadow-md space-x-3"
            >
              Manage My Books
            </button>
          )}

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="w-full flex items-center justify-center py-3 px-6 
            bg-red-600 text-white font-serif text-lg rounded-md 
            hover:bg-red-700 transition-colors duration-200 
            shadow-md space-x-3"
          >
            <LogOut className="w-6 h-6" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
