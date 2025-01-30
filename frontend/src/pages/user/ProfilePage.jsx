import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  BookOpen,
  KeyRound,
  LogOut,
  Library,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    // Add fade-out animation before logout
    const container = document.querySelector(".profile-container");
    container.classList.add("opacity-0");

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart"); // Ensure cart is cleared
      navigate("/login");
      window.location.reload();
    }, 300);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="profile-container max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-xl p-8 md:p-10 transition-all duration-300 opacity-100">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-4xl text-white font-bold">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {user.username}
          </h2>
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* User Info */}
        <div className="space-y-6">
          {/* Username */}
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/70">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-blue-400" />
                <label className="text-lg text-gray-300">Username</label>
              </div>
              <p className="text-lg text-white mt-2 md:mt-0">{user.username}</p>
            </div>
          </div>

          {/* Email */}
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/70">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-blue-400" />
                <label className="text-lg text-gray-300">Email</label>
              </div>
              <p className="text-lg text-white mt-2 md:mt-0">{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/70">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <label className="text-lg text-gray-300">Role</label>
              </div>
              <p className="text-lg text-white capitalize mt-2 md:mt-0">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 space-y-4">
          {user.role === "seller" && (
            <button
              onClick={() => navigate("/mybooks")}
              className="w-full flex items-center justify-center py-3 px-6 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Manage My Books</span>
            </button>
          )}
          <button
            onClick={() => navigate("/my-library")}
            className="w-full flex items-center justify-center py-3 px-6 bg-green-600 text-white text-lg rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 space-x-2"
          >
            <Library className="w-5 h-5" />
            <span>My Library</span>
          </button>

          {/* Change Password Button */}
          <button
            onClick={() => navigate("/change-password")}
            className="w-full flex items-center justify-center py-3 px-6 bg-yellow-500 text-white text-lg rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 space-x-2"
          >
            <KeyRound className="w-5 h-5" />
            <span>Change Password</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-3 px-6 bg-red-600 text-white text-lg rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
