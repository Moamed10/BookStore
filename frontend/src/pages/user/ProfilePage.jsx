import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, BookOpen, KeyRound, LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    // Add a fade-out animation to the container before logout
    const container = document.querySelector(".profile-container");
    container.classList.add("opacity-0");

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }, 300);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="profile-container max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-xl p-8 md:p-10 transition-all duration-300 opacity-100">
        {/* Profile Header with Avatar */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-4xl text-white font-bold">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {user.username}
          </h2>
          <p className="text-gray-400">{user.email}</p>
        </div>

        <div className="space-y-6">
          {/* Username Section */}
          <div className="group transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/70 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-blue-400" />
                <label className="text-lg text-gray-300">Username</label>
              </div>
              <p className="text-lg text-white mt-2 md:mt-0">{user.username}</p>
            </div>
          </div>

          {/* Email Section */}
          <div className="group transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/70 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-blue-400" />
                <label className="text-lg text-gray-300">Email</label>
              </div>
              <p className="text-lg text-white mt-2 md:mt-0">{user.email}</p>
            </div>
          </div>

          {/* Role Section */}
          <div className="group transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/70 transition-all duration-300">
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
              className="w-full group relative py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Manage My Books</span>
            </button>
          )}

          <button
            onClick={() => navigate("/change-password")}
            className="w-full group relative py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-lg rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <KeyRound className="w-5 h-5" />
            <span>Change Password</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full group relative py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
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
