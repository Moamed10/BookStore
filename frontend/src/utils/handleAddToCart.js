// utils/handleAddToCart.js

export const handleAddToCart = (book, setAddedBook, setIsPopupVisible) => {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to log in to add items to the cart.");
    return;
  }

  // Get the cart from localStorage or initialize it
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the book is already in the cart
  const existingBook = cart.find((item) => item._id === book._id);

  if (existingBook) {
    existingBook.quantity += 1; // Increment the quantity
  } else {
    cart.push({ ...book, quantity: 1 }); // Add the new book with quantity 1
  }

  // Update the cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Set the added book to show in the popup
  setAddedBook(book);
  setIsPopupVisible(true);

  // Show popup and reload page after 2 seconds
  setTimeout(() => {
    setIsPopupVisible(false);
    window.location.reload(); // Reload the page to update cart count
  }, 2000);
};
