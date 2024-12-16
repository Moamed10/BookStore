import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
    password: "********",
    profileImage: "https://via.placeholder.com/150",
    socialLinks: {
      twitter: "https://twitter.com/johndoe",
      facebook: "https://facebook.com/johndoe",
    },
    role: "buyer",
    purchasedBooks: ["Book 1", "Book 2", "Book 3"],
    soldBooks: ["Book sold A", "Book sold B"],
    favoriteBooks: ["Book X", "Book Y", "Book Z"],
  });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

     
      <div className="flex flex-col items-center mb-6">
        <img
          src={userData.profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        <h2 className="text-2xl font-semibold">{userData.username}</h2>
      </div>

    
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <p className="text-lg">Email: {userData.email}</p>
        <p className="text-lg">Password: {userData.password}</p>
        <div className="mt-2">
          <a href={userData.socialLinks.twitter} className="text-blue-500">
            Twitter
          </a>{" "}
          |{" "}
          <a href={userData.socialLinks.facebook} className="text-blue-500">
            Facebook
          </a>
        </div>
      </div>

     
      {userData.role === "buyer" && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Purchased Books</h3>
          <ul>
            {userData.purchasedBooks.map((book, index) => (
              <li key={index} className="text-gray-700">
                {book}
              </li>
            ))}
          </ul>
        </div>
      )}

      {userData.role === "seller" && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Sold Books</h3>
          <ul>
            {userData.soldBooks.map((book, index) => (
              <li key={index} className="text-gray-700">
                {book}
              </li>
            ))}
          </ul>
        </div>
      )}

    
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Favorite Books</h3>
        <ul>
          {userData.favoriteBooks.map((book, index) => (
            <li key={index} className="text-gray-700">
              {book}
            </li>
          ))}
        </ul>
      </div>

 
      <button
        onClick={() => navigate("/edit-profile", { state: { userData, setUserData } })}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfilePage;