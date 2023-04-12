import React, { useContext, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Feather } from "@expo/vector-icons";
import CartContext from "../context/CartContext";
import PopupModal from "../components/PopupModal";
import CartScreenItem from "../components/CartScreenItem";
import HairlineDivider from "../components/HairlineDivider";
import LoginContext from "../context/LoginContext";

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const CartScreen = () => {
	const { shoppingCart, deleteCoffee } = useContext(CartContext);
	const { isLoggedIn } = useContext(LoginContext);
	const [modalChildren, setModalChildren] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [frequencySelected, setFrequencySelected] = useState("");
	let initialTotalCost = 0;
	shoppingCart.forEach((element) => (initialTotalCost += +element.price));
	//TODO: Fix quantity bug when deleting previous indices of shoppingCart
	// DON'T DELETE TOTALCOST STUFF PLEASE
	const [totalCost, setTotalCost] = useState(initialTotalCost);

	const subscriptionFrequencies = [
		{ key: "0.5", value: "1/2 a Month" },
		{ key: "1", value: "1 Month" },
		{ key: "2", value: "2 Months" },
		{ key: "6", value: "6 Months" },
	];

	const allCartItems =
		shoppingCart.length > 0 ? (
			<FlatList
				data={shoppingCart}
				keyExtractor={(item) => {
					item.coffee_id;
				}}
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
								totalCost={totalCost}
								setTotalCost={setTotalCost}
								index={index}
							/>
							{hairlineDivider}
						</View>
					);
				}}
				showsVerticalScrollIndicator={false}
			/>
		) : (
			<Text style={styles.emptyCartText}>The cart is empty!</Text>
		);

	const screen = [
		<View style={styles.centeredViewStyle}>
			<PopupModal
				modalChildren={modalChildren}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
			<View style={styles.containerStyle}>
				<Text style={styles.headingOne}>Current Cart</Text>

				<View style={styles.allCartItemsContainer}>{allCartItems}</View>

				<View style={styles.checkoutAndDeliveryPeriodContainer}>
					<SelectList
						setSelected={(val) => setFrequencySelected(val)}
						data={subscriptionFrequencies}
						save={frequencySelected}
						search={false}
						placeholder="Renews every:"
						fontFamily="Abel_400Regular"
						boxStyles={styles.selectListBox}
						inputStyles={styles.selectListInputText}
						dropdownTextStyles={styles.selectListDropdownText}
						dropdownStyles={styles.selectListDropdownBox}
						arrowicon={
							<Feather name="chevron-down" size={20} color="#581613" />
						}
					/>
					<TouchableOpacity
						style={styles.buttonContainerStyle}
						onPress={() => {}}
					>
						<Text style={styles.subscriptionButtonStyle}>Checkout</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>,
	];

	return (
		<FlatList
			data={screen}
			renderItem={({ item }) => {
				return item;
			}}
			showsVerticalScrollIndicator={false}
		/>
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
		paddingBottom: 100,
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
		paddingHorizontal: 9,
		paddingVertical: 15,
		borderRadius: 50,
		maxHeight: 360,
	},
	emptyCartText: {
		fontFamily: "Abel_400Regular",
		fontSize: 30,
		marginVertical: 20,
		alignSelf: "center",
	},
	buttonContainerStyle: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginTop: 10,
		borderColor: "#581613",
		borderWidth: 1,
		width: "100%",
	},
	subscriptionButtonStyle: {
		fontSize: 26,
		flex: 1,
		color: "#581613",
		fontFamily: "HankenGrotesk_300Light",
		paddingLeft: 5,
		textAlign: "center",
	},
	checkoutAndDeliveryPeriodContainer: { marginTop: 15 },
	selectListBox: {
		borderRadius: 0,
		borderColor: "#581613",
		borderWidth: 1,
		width: "100%",
	},
	selectListInputText: {
		color: "black",
		fontSize: 18,
	},
	selectListDropdownBox: {
		borderRadius: 5,
		borderColor: "#581613",
	},
	selectListDropdownText: {
		color: "black",
		fontSize: 15,
	},
	totalText: {
		fontFamily: "Abel_400Regular",
		fontSize: 25,
		marginVertical: 10,
		alignSelf: "flex-end",
	},
});

export default CartScreen;
