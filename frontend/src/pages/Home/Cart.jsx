import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getImgUrl from "../../utils/getImgUrl";

const CartItem = ({ title, price, category, imageUrl, quantity, onRemove }) => {
  return (
    <li className="flex py-6 items-center hover:bg-gray-50 transition-all duration-300">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-md">
        <img
          alt={title}
          src={imageUrl}
          className="h-full w-full object-cover object-center rounded-md"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-lg font-medium text-gray-900">${price}</p>
        </div>
        <p className="text-sm text-gray-500 capitalize">
          <strong>Category:</strong> {category}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            <strong>Qty:</strong> {quantity}
          </p>
          <button
            type="button"
            onClick={onRemove}
            className="font-medium text-red-600 hover:text-red-500 transition-all duration-200"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );

  return (
    <div className="flex flex-col mt-12 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-6 sm:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">
            Shopping Cart
          </h2>
          <button
            type="button"
            onClick={handleClearCart}
            className="text-sm font-medium text-red-600 hover:text-red-500 transition-all duration-200"
          >
            Clear Cart
          </button>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {cart.map((item) => (
            <CartItem
              key={item._id}
              title={item.title}
              price={item.newPrice}
              category={item.category}
              imageUrl={getImgUrl(item.coverImage)}
              quantity={item.quantity}
              onRemove={() => handleRemove(item._id)}
            />
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 px-6 py-6 sm:px-8 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium px-8 py-3 shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Proceed to Checkout
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <Link to="/">
            or{" "}
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
