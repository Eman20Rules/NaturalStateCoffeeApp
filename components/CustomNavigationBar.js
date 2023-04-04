import { StyleSheet } from "react-native";
import { Appbar, Menu, Provider } from "react-native-paper";
import { useState } from "react";

function CustomNavigationBar({ navigation }) {
	const [visible, setVisible] = useState(false);
	const [userToken, setUserToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const closeMenu = () => setVisible(false);
	const openMenu = (v) => setVisible(true);

	return (
		<Provider>
			<Appbar.Header style={style.appBar}>
				<Appbar.Action
					style={style.profile}
					icon="account"
					onPress={() => navigation.navigate("Account")}
				/>
				<Appbar.Content titleStyle={style.title} title="NATURAL STATE" />
				<Appbar.Action
					style={style.cart}
					icon="cart"
					onPress={() => navigation.navigate("Cart")}
				/>
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
});

export default CustomNavigationBar;
