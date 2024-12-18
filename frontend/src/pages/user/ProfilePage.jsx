import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();


  const [userInfo, setUserInfo] = useState({
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


  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserInfo({ ...userInfo, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated user info:", userInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md font-sans">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        <div className="flex flex-col items-center mb-6">
          <img
            src={userInfo.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold">{userInfo.username}</h2>
        </div>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            {userInfo.photo ? (
              <img
                src={userInfo.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500">
                No Photo
              </div>
            )}
            {!isEditing ? (
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {userInfo.userName || "No Name Provided"}
              </h2>
            ) : (
              <input
                type="text"
                name="userName"
                value={userInfo.userName}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="mt-4 border rounded-md w-full p-2"
              />
            )}
          </div>

          {isEditing && (
            <div className="mt-4">
              <label
                htmlFor="photoUpload"
                className="block text-gray-600 font-medium"
              >
                Upload Photo:
              </label>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-2 block w-full text-gray-600"
              />
            </div>
          )}

          <div className="mt-6 space-y-4">
            {!isEditing ? (
              <>
                <p className="text-gray-600">
                  <strong>Email:</strong> {userInfo.email || "No Email Provided"}
                </p>
                <p className="text-gray-600">
                  <strong>Password:</strong>{" "}
                  {userInfo.password || "No password Provided"}
                </p>
              </>
            ) : (
              <>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="border rounded-md w-full p-2"
                />
                <input
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="border rounded-md w-full p-2"
                />
              </>
            )}
          </div>

      
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <p className="text-lg">Email: {userInfo.email}</p>
          <p className="text-lg">Password: {userInfo.password}</p>
          <div className="mt-2">
            <a href={userInfo.socialLinks.twitter} className="text-blue-500">
              Twitter
            </a>{" "}
            |{" "}
            <a href={userInfo.socialLinks.facebook} className="text-blue-500">
              Facebook
            </a>
          </div>
        </div>

     
        {userInfo.role === "buyer" && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Purchased Books</h3>
            <ul>
              {userInfo.purchasedBooks.map((book, index) => (
                <li key={index} className="text-gray-700">
                  {book}
                </li>
              ))}
            </ul>
          </div>
        )}

        {userInfo.role === "seller" && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Sold Books</h3>
            <ul>
              {userInfo.soldBooks.map((book, index) => (
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
            {userInfo.favoriteBooks.map((book, index) => (
              <li key={index} className="text-gray-700">
                {book}
              </li>
            ))}
          </ul>
        </div>

  
        <button
          onClick={() => navigate("/edit-profile", { state: { userInfo, setUserInfo } })}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </div>
  )
};

export default ProfilePage;
