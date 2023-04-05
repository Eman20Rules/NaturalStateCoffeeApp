import React, { Component, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CartContext from "../context/CartContext";

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const CartScreen = () => {
	const { shoppingCart, addCoffeeToCart } = useContext(CartContext);
	return (
		<View style={styles.centeredViewStyle}>
			<View style={styles.containerStyle}>
				<Text>Current Cart</Text>
				<View>
					<FlatList
						data={shoppingCart}
						renderItem={({ item }) => {
							return <Text>{item.coffee_name}</Text>;
						}}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredViewStyle: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	containerStyle: {
		width: "100%",
		height: "100%",
		paddingTop: headerPadding,
		paddingBottom: 150,
	},
});

export default CartScreen;
