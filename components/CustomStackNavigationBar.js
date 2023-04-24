import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Dimensions,
} from "react-native";
import { Appbar, Menu, Provider } from "react-native-paper";
import { useContext } from "react";

import CartContext from "../context/CartContext";
import MySubscriptionsContext from "../context/MySubscriptionsContext";
import LoginContext from "../context/LoginContext";

function CustomNavigationBar({ navigation }) {
	const { shoppingCart } = useContext(CartContext);
	const { updateSubscriptionList } = useContext(MySubscriptionsContext);
	const { isLoggedIn, isAdmin } = useContext(LoginContext);

	const cartNotificationNumber =
		shoppingCart.length > 0 ? (
			<View style={style.cartNotificationNumberContainer}>
				<Text style={style.cartNotificationNumber}>{shoppingCart.length}</Text>
			</View>
		) : null;

	const allOrdersMenuItem = isAdmin ? (
		<Menu.Item
			onPress={() => {
				navigation.navigate("ViewOrders");
			}}
			title={"(ADMIN) All User Orders"}
		/>
	) : null;

	const mySubscriptionsMenuItem = isLoggedIn() ? (
		<Menu.Item
			onPress={() => {
				updateSubscriptionList();
				navigation.navigate("ActiveSubscriptions");
			}}
			title="View Active Subscriptions"
		/>
	) : null;

	const editCoffeesMenuItem = isAdmin ? (
		<Menu.Item
			onPress={() => {
				navigation.navigate("EditCoffees");
			}}
			title={"(ADMIN) Edit Available Coffees"}
		/>
	) : null;

	/* TODO: Re-add this menu if things don't work
			<Menu
					visible={visible}
					onDismiss={() => setVisible(false)}
					anchor={
						<Appbar.Action
							style={style.menu}
							icon="menu"
							onPress={() => {
								setVisible(true);
							}}
						/>
					}
				>
					<Menu.Item
						onPress={() => {
							setVisible(false);
							navigation.navigate("Home");
						}}
						title="Home"
					/>
					<Menu.Item
						onPress={() => {
							setVisible(false);

							if (isLoggedIn()) {
								navigation.navigate("Account");
							} else {
								navigation.navigate("Login");
							}
						}}
						title={isLoggedIn() ? "View Account" : "Login"}
					/>
					{mySubscriptionsMenuItem}
					{allOrdersMenuItem}
					{editCoffeesMenuItem}
				</Menu>
			*/

	return (
		<Appbar.Header style={style.appBar}>
			<Appbar.Action
				style={style.menu}
				icon="arrow-left"
				onPress={() => {
					navigation.goBack();
				}}
			/>
			<View style={style.titleContainerStyle}>
				<Appbar.Content titleStyle={style.title} title="NATURAL STATE" />
			</View>
			<TouchableOpacity onPress={() => navigation.navigate("Cart")}>
				<Appbar.Action
					style={style.cart}
					icon="cart"
					onPress={() => navigation.navigate("Cart")}
				/>
				{cartNotificationNumber}
			</TouchableOpacity>
			<Appbar.Action
				style={style.profile}
				icon="account"
				onPress={() => {
					if (!isLoggedIn()) {
						alert("Not logged in");
						return;
					}
					navigation.navigate("Account");
				}}
			/>
		</Appbar.Header>
	);
}

// export function LogInOrViewAccount() {
//   loggedInProp ? (
//     <Menu.Item
//       onPress={() => {
//         setVisible(false);

//         navigation.navigate("Account");
//       }}
//       title={"View Account"}
//     />
//   ) : (
//     <Menu.Item
//       onPress={() => {
//         setVisible(false);

//         navigation.navigate("Login");
//       }}
//       title={"Login (Sign Up)"}
//     />
//   );
// }

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
		textAlignVertical: "center",
	},
	appBar: {
		justifyContent: "center",
		borderBottomColor: "#4a402a",
		borderBottomWidth: 2,
		width: Dimensions.get("window").width,
		marginTop: 10,
		height: 50,
	},

	titleContainerStyle: {
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
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
