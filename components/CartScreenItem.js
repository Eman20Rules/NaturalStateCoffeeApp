import React, { useContext, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CartContext from "../context/CartContext";
import HairlineDivider from "./HairlineDivider";

const imageSize = 100;
const quantityButtonSize = 15;

const CartScreenItem = ({
	cartItemCoffee,
	setModalChildren,
	setModalVisible,
	setTotalCost,
	totalCost,
}) => {
	const { deleteCoffee } = useContext(CartContext);
	const [coffeeItemQuantity, setCoffeeItemQuantity] = useState(1);

	const showRemoveItemPopup = () => {
		setModalChildren(removeItemPopupContent);
		setModalVisible(true);
	};
	const changeItemQuantity = (quantityChange) => {
		if (quantityChange < 0) {
			if (coffeeItemQuantity - 1 > 0) {
				setCoffeeItemQuantity(coffeeItemQuantity - 1);
				setTotalCost(totalCost - +cartItemCoffee.price);
			}
		} else {
			if (coffeeItemQuantity + 1 <= 10) {
				setCoffeeItemQuantity(coffeeItemQuantity + 1);
				setTotalCost(totalCost + +cartItemCoffee.price);
			}
		}
	};

	const removeItemPopupContent = (
		<View>
			<Text
				style={{
					alignSelf: "center",
					marginBottom: 10,
					fontFamily: "Abel_400Regular",
					fontSize: 20,
				}}
			>
				Remove {cartItemCoffee.coffee_name} from your cart?
			</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => {
						setTotalCost(totalCost - cartItemCoffee.price * coffeeItemQuantity);
						deleteCoffee(cartItemCoffee);
						setModalVisible(false);
					}}
					style={styles.buttonView}
				>
					<View style={{ alignItems: "center", width: "100%" }}>
						<Text style={styles.buttonText}>Yes</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setModalVisible(false);
					}}
					style={styles.buttonView}
				>
					<View style={{ alignItems: "center", width: "100%" }}>
						<Text style={styles.buttonText}>No</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View style={styles.cartItemContainer}>
			<TouchableOpacity onPress={() => showRemoveItemPopup(cartItemCoffee)}>
				<Feather name="x" size={24} color="#581613" />
			</TouchableOpacity>
			<Image src={cartItemCoffee.coffee_image} style={styles.cartItemImage} />
			<View style={styles.nameAndQuantityContainer}>
				<Text style={styles.itemName}>{cartItemCoffee.coffee_name}</Text>
				<View style={styles.quantityContainer}>
					<TouchableOpacity
						style={styles.quantityButtonContainer}
						onPress={() => {
							changeItemQuantity(-1);
						}}
					>
						<Feather
							name="minus-circle"
							size={quantityButtonSize}
							color="#581613"
						/>
					</TouchableOpacity>
					<Text style={styles.quantityText}>{coffeeItemQuantity}</Text>
					<TouchableOpacity
						style={styles.quantityButtonContainer}
						onPress={() => {
							changeItemQuantity(1);
						}}
					>
						<Feather
							name="plus-circle"
							size={quantityButtonSize}
							color="#581613"
						/>
					</TouchableOpacity>
				</View>
			</View>
			<Text style={styles.priceText}>
				${(cartItemCoffee.price * coffeeItemQuantity).toFixed(2)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItemContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	cartItemImage: {
		height: imageSize,
		width: imageSize,
		marginHorizontal: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	buttonView: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		marginHorizontal: 10,
		borderColor: "#581613",
		borderWidth: 1,
		width: 100,
	},
	buttonText: {
		fontSize: 17,
		color: "#581613",
		fontFamily: "HankenGrotesk_300Light",
		alignSelf: "center",
		textAlign: "center",
	},
	quantityContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 3,
	},
	quantityButtonContainer: { marginHorizontal: 3 },
	quantityText: { fontSize: 16 },
	nameAndQuantityContainer: {
		justifyContent: "center",
		height: imageSize,
		flex: 1,
	},
	itemName: {
		fontFamily: "Abel_400Regular",
		fontSize: 20,
	},
	priceText: {
		fontFamily: "Abel_400Regular",
		fontSize: 18,
		marginHorizontal: 15,
	},
});

export default CartScreenItem;
