import { useState } from "react";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    photo: "",
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

        <div className="mt-6 flex justify-end space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
