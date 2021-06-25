import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(item) {
    const aux = cart;
    aux.push(item);
    setCart(aux);
    console.log(cart);
  }

  function removeItem(id) {
    const filteredCart = cart.filter((item) => item.id !== id);
    setCart(filteredCart);
    console.log(cart);
  }

  function clearCart() {
    setCart([]);
    console.log(cart);
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
