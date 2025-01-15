import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const navigate = useNavigate();

  // Get the subtotal passed from the Cart component
  const location = useLocation();
  const subtotal = location.state?.subtotal || 0;

  // Define VAT percentage (e.g., 21%)
  const VAT_PERCENTAGE = 0.21;

  // Calculate the VAT (BTW)
  const vatAmount = subtotal * VAT_PERCENTAGE;

  // Calculate the total price including VAT
  const totalPrice = subtotal + vatAmount;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Fake payment processing
    setTimeout(() => {
      setIsPaymentSuccessful(true); // Simulate a successful payment after 2 seconds
    }, 2000);
  };

  const handleGoToHome = () => {
    navigate("/"); // Redirect to homepage after payment success
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment</h2>

      {isPaymentSuccessful ? (
        <div className="text-center">
          <h3 className="text-xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h3>
          <button
            onClick={handleGoToHome}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Go to Home
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
