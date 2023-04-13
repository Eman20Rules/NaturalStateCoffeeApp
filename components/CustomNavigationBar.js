import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Appbar, Menu, Provider } from "react-native-paper";
import { useContext, useState } from "react";
import CartContext from "../context/CartContext";

function CustomNavigationBar({ navigation }) {
	const [visible, setVisible] = useState(false);
	const [userToken, setUserToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const { shoppingCart } = useContext(CartContext);

	const closeMenu = () => setVisible(false);
	const openMenu = (v) => setVisible(true);

	const cartNotificationNumber =
		shoppingCart.length > 0 ? (
			<View style={style.cartNotificationNumberContainer}>
				<Text style={style.cartNotificationNumber}>{shoppingCart.length}</Text>
			</View>
		) : null;

	return (
		<Provider>
			<Appbar.Header style={style.appBar}>
				<Appbar.Action
					style={style.profile}
					icon="account"
					onPress={() => navigation.navigate("Account")}
				/>
				<TouchableOpacity
					style={style.titleContainerStyle}
					onPress={() => {
						navigation.navigate("Home");
					}}
				>
					<Appbar.Content titleStyle={style.title} title="NATURAL STATE" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("Cart")}>
					<Appbar.Action
						style={style.cart}
						icon="cart"
						onPress={() => navigation.navigate("Cart")}
					/>
					{cartNotificationNumber}
				</TouchableOpacity>
				<Menu
					visible={visible}
					onDismiss={closeMenu}
					anchor={
						<Appbar.Action style={style.menu} icon="menu" onPress={openMenu} />
					}
				>
					<Menu.Item
						onPress={() => {
							closeMenu();
							navigation.navigate("Home");
						}}
						title="Home"
					/>
					<Menu.Item
						onPress={() => {
							closeMenu();
							navigation.navigate("Login");
						}}
						title="Sign Up / Login"
					/>
					<Menu.Item
						onPress={() => {
							closeMenu();
							navigation.navigate("ActiveSubscriptions");
						}}
						title="View Active Subscriptions"
					/>
					<Menu.Item
						onPress={() => {
							closeMenu();
							navigation.navigate("ViewOrders");
						}}
						title="View Orders"
					/>
				</Menu>
			</Appbar.Header>
		</Provider>
	);
}

const style = StyleSheet.create({
	menu: {
		justifyContent: "center",
	},
	cart: {
		justifyContent: "center",
	},
	profile: {
		justifyContent: "center",
	},
	title: {
		fontWeight: "bold",
		fontSize: 25,
		color: "#4a402a",
	},
	appBar: {
		height: 50,
		borderBottomColor: "#4a402a",
		borderBottomWidth: 2,
	},
	menuItems: {
		flex: 1,
		fontSize: 15,
		textAlignVertical: "center",
		textAlign: "center",
		paddingVertical: 30,
		color: "#1260de",
	},
	titleContainerStyle: {
		height: 28,
		flex: 1,
	},
	cartNotificationNumber: {
		color: "white",
		textAlign: "center",
		textAlignVertical: "center",
	},
	cartNotificationNumberContainer: {
		position: "absolute",
		borderRadius: 45,
		backgroundColor: "rgba(88, 22, 19, .7)",
		width: 20,
		height: 20,
		bottom: 3,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CustomNavigationBar;
