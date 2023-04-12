import React, { useState } from "react";

const CartContext = React.createContext();

const cartSet = new Set();

export const CartProvider = ({ children }) => {
	const [shoppingCart, setShoppingCart] = useState([]);

	function addCoffeeToCart(coffeeObject) {
		if (cartSet.has(coffeeObject.coffee_id)) {
			return;
		}
		coffeeObject.quantity = 1;
		cartSet.add(coffeeObject.coffee_id);
		setShoppingCart([...shoppingCart, coffeeObject]);
	}

	function deleteCoffee(coffeeObject) {
		cartSet.delete(coffeeObject.coffee_id);
		setShoppingCart(shoppingCart.filter((coffee) => coffee != coffeeObject));
	}

	function setCartQuantity(id, newQuantity) {
		setShoppingCart(
			shoppingCart.map((item) =>
				item.coffee_id == id ? { ...item, quantity: newQuantity } : item
			)
		);
	}

	return (
		<CartContext.Provider
			value={{ shoppingCart, addCoffeeToCart, deleteCoffee, setCartQuantity }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
