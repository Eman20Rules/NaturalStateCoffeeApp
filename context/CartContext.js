import React, { useState } from "react";

const CartContext = React.createContext();

const cartSet = new Set();

export const CartProvider = ({ children }) => {
	const [shoppingCart, setShoppingCart] = useState([]);

	function addCoffeeToCart(coffeeObject) {
		if (cartSet.has(coffeeObject)) {
			return;
		}
		cartSet.add(coffeeObject);
		setShoppingCart([...shoppingCart, coffeeObject]);
	}

	function deleteCoffee(coffeeObject) {
		cartSet.delete(coffeeObject);
		setShoppingCart(shoppingCart.filter((coffee) => coffee != coffeeObject));
	}

	return (
		<CartContext.Provider
			value={{ shoppingCart, addCoffeeToCart, deleteCoffee }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
