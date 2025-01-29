import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Lock, Mail, EyeOff, Eye, CheckCircle2 } from "lucide-react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
  });

  if (!token) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, []);

  const checkPasswordStrength = (password) => {
    const checks = {
      hasLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpper: /[A-Z]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    setPasswordStrength({ ...checks, score });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "newPassword") {
      checkPasswordStrength(value);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setMessage("");

    const { email, oldPassword, newPassword, repeatPassword } = formData;

    if (!oldPassword || !newPassword || !repeatPassword) {
      setMessage("All fields are required.");
      return;
    }

    if (newPassword !== repeatPassword) {
      setMessage("New password and repeat password do not match.");
      return;
    }

    if (passwordStrength.score < 3) {
      setMessage("Please create a stronger password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:5000/change-password",
        {
          email,
          oldPassword,
          newPassword,
        }
      );
      setShowSuccess(true);
      setMessage(response.data.message);
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      }));
      setPasswordStrength({
        score: 0,
        hasLength: false,
        hasNumber: false,
        hasSpecial: false,
        hasUpper: false,
      });
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStrengthColor = (score) => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
    ];
    return colors[score - 1] || "bg-gray-200";
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
        <div className="px-8 pt-6 pb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lock className="h-6 w-6 text-blue-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 transition-transform duration-300 transform hover:scale-105">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                />
              </div>
            </div>

            {/* Password Fields */}
            {[
              { name: "oldPassword", label: "Current Password" },
              { name: "newPassword", label: "New Password" },
              { name: "repeatPassword", label: "Repeat New Password" },
            ].map((field) => (
              <div key={field.name} className="relative group">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    id={field.name}
                    name={field.name}
                    type={showPasswords[field.name] ? "text" : "password"}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    required
                    minLength={field.name === "newPassword" ? 8 : undefined}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => togglePasswordVisibility(field.name)}
                  >
                    {showPasswords[field.name] ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            {/* Password Strength Indicator (only for new password) */}
            {formData.newPassword && (
              <div className="space-y-2">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`h-2 w-full rounded-full transition-all duration-300 ${
                        index <= passwordStrength.score
                          ? getStrengthColor(passwordStrength.score)
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className={`flex items-center gap-1 ${
                      passwordStrength.hasLength
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" /> 8+ characters
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      passwordStrength.hasNumber
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Numbers
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      passwordStrength.hasUpper
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Uppercase
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      passwordStrength.hasSpecial
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Special chars
                  </div>
                </div>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div
                className={`p-4 rounded-md transition-all duration-300 animate-fade-in ${
                  showSuccess
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {showSuccess ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-red-500" />
                  )}
                  {message}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                className={`
                  relative w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md
                  transform transition-all duration-200
                  hover:bg-blue-600 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                  ${isSubmitting ? "bg-blue-400" : ""}
                `}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Changing...
                  </span>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-500 text-sm">
            &copy;2025 Endless-Library. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
