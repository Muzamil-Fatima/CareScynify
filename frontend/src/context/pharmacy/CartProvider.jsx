import React from "react";
import { CartContext } from "./CartContext";
import { useCart } from "../../hooks/pharmacy/useCart";


const CartProvider = ({ children }) => {

  const cart = useCart();


  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );

};


export default CartProvider;