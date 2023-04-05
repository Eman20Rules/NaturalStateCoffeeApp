import React, { useState } from "react";

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
	const [shoppingCart, setShoppingCart] = useState([]);

	function addCoffeeToCart(coffeeObject) {
		setShoppingCart([...shoppingCart, coffeeObject]);
	}

	return (
		<CartContext.Provider value={{ shoppingCart, addCoffeeToCart }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
