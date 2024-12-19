import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getImgUrl from "../../utils/getImgUrl";

const CartItem = ({ title, price, category, imageUrl, quantity, onRemove }) => {
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={title}
          src={imageUrl}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
            <h3>{title}</h3>
            <p className="sm:ml-4">${price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            <strong>Category:</strong> {category}
          </p>
        </div>
        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
          <p className="text-gray-500">
            <strong>Qty:</strong> {quantity}
          </p>
          <div className="flex">
            <button
              type="button"
              onClick={onRemove}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
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
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping Cart</div>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              onClick={handleClearCart}
              className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
            >
              <span>Clear Cart</span>
            </button>
          </div>
        </div>
        <div className="mt-8">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
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
      </div>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${subtotal}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
