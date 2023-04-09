import React, { useContext } from "react";
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

const CartScreenItem = ({
	cartItemCoffee,
	setModalChildren,
	setModalVisible,
}) => {
	const { deleteCoffee } = useContext(CartContext);

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

	const showRemoveItemPopup = () => {
		setModalChildren(removeItemPopupContent);
		setModalVisible(true);
	};

	return (
		<View style={styles.cartItemContainer}>
			<TouchableOpacity onPress={() => showRemoveItemPopup(cartItemCoffee)}>
				<Feather name="x" size={24} color="#581613" />
			</TouchableOpacity>
			<Image src={cartItemCoffee.coffee_image} style={styles.cartItemImage} />
			<Text>{cartItemCoffee.coffee_name}</Text>
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
});

export default CartScreenItem;
