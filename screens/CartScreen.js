import React, { useContext, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import CartContext from "../context/CartContext";
import PopupModal from "../components/PopupModal";
import CartScreenItem from "../components/CartScreenItem";
import { Feather } from "@expo/vector-icons";
import HairlineDivider from "../components/HairlineDivider";

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const CartScreen = () => {
	const { shoppingCart, deleteCoffee } = useContext(CartContext);
	const [modalChildren, setModalChildren] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const allCartItems =
		shoppingCart.length > 0 ? (
			<FlatList
				data={shoppingCart}
				renderItem={({ item, index }) => {
					const hairlineDivider =
						index < shoppingCart.length - 1 ? (
							<HairlineDivider marginVertical={5} marginHorizontal={10} />
						) : null;

					return (
						<View>
							<CartScreenItem
								cartItemCoffee={item}
								setModalChildren={setModalChildren}
								setModalVisible={setModalVisible}
							/>
							{hairlineDivider}
						</View>
					);
				}}
			/>
		) : (
			<Text style={styles.emptyCartText}>The cart is empty!</Text>
		);

	return (
		<View style={styles.centeredViewStyle}>
			<PopupModal
				modalChildren={modalChildren}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
			<View style={styles.containerStyle}>
				<Text style={styles.headingOne}>Current Cart</Text>
				<View style={styles.allCartItemsContainer}>{allCartItems}</View>
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
		paddingHorizontal: 25,
	},
	headingOne: {
		fontSize: 35,
		paddingTop: 25,
		paddingBottom: 5,
		paddingHorizontal: 8,
		fontFamily: "Abel_400Regular",
	},
	allCartItemsContainer: {
		borderColor: "#c9d1cb",
		borderWidth: 2,
		minHeight: 50,
		justifyContent: "center",
		paddingHorizontal: 5,
		paddingVertical: 15,
		borderRadius: 50,
	},
	emptyCartText: {
		fontFamily: "Abel_400Regular",
		fontSize: 30,
		marginVertical: 20,
		alignSelf: "center",
	},
});

export default CartScreen;
