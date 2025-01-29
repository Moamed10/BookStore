import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const navigate = useNavigate();

  // Get the subtotal passed from the Cart component
  const location = useLocation();
  const subtotal = location.state?.subtotal || 0;

  // Simulate VAT and total calculation
  const VAT_PERCENTAGE = 0.21;
  const vatAmount = subtotal * VAT_PERCENTAGE;
  const totalPrice = subtotal + vatAmount;

  // Check if user is logged in by verifying token in localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If the user is not logged in, redirect to login page
  if (!token) {
    navigate("/login");
    return null;
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const userEmail = user?.email;

    if (!userEmail) {
      alert("Error: User email not found.");
      navigate("/login");
      return;
    }

    // Simulate successful payment after a short delay
    setTimeout(async () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const bookIds = cartItems.map((item) => item._id);

        if (!bookIds.length) {
          alert("Your cart is empty.");
          return;
        }

        const response = await axios.post("http://localhost:5000/purchase", {
          userEmail,
          bookIds,
        });

        // Assuming the response contains the updated boughtBooks list
        const updatedBoughtBooks = response.data.updatedBoughtBooks;

        // Update localStorage with the updated boughtBooks
        localStorage.setItem("boughtBooks", JSON.stringify(updatedBoughtBooks));

        // Optionally update the user object in localStorage
        const updatedUser = { ...user, boughtBooks: updatedBoughtBooks };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Clear the cart after payment success
        localStorage.removeItem("cart");

        setIsPaymentSuccessful(true);

        // After successful payment, redirect to "My Library"
        setTimeout(() => {
          navigate("/my-library"); // Redirect to "My Library" after purchase
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error during payment:", error);
        alert("Error during payment. Please try again.");
      }
    }, 2000); // Simulated delay
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment</h2>

      {isPaymentSuccessful ? (
        <div className="text-center">
          <h3 className="text-xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h3>
          <p>Your purchase has been recorded. Thank you for buying!</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Go to Home-Page
          </button>
        </div>
      ) : (
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter card number"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="expirationDate" className="block text-gray-700">
                Expiration Date
              </label>
              <input
                id="expirationDate"
                type="text"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="cvv" className="block text-gray-700">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter CVV"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-900">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              VAT (21%): ${vatAmount.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              Total (Incl. VAT): ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700"
            >
              Pay Now
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PaymentPage;
