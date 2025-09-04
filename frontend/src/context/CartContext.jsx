import { createContext, useContext, useState } from "react";

// Create a CartContext
const CartContext = createContext();

// CartProvider component to wrap the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add a medicine to the cart
  const addToCart = (medicine) => {
    const existingItem = cart.find((item) => item.name === medicine.name);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.name === medicine.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...medicine, quantity: 1 }]);
    }
  };

  // Function to update quantity of an item in the cart
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return; // Ensure quantity is at least 1
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);