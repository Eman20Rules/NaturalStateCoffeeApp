import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import LoginContext from "../context/LoginContext";
import { Feather } from "@expo/vector-icons";

const DrawerWindow = (props) => {
	const { navigation } = props;
	const { isLoggedIn, isAdmin } = useContext(LoginContext);

	const iconSize = 25;
	const iconColor = "#581613";

	const accountDrawerButton = isLoggedIn() ? (
		<DrawerItem
			label="Account"
			onPress={() => {
				navigation.closeDrawer();
				navigation.navigate("Account");
			}}
			style={styles.drawerItemView}
			labelStyle={styles.drawerItemLabel}
			icon={({ focused, color, size }) => (
				<Feather color={iconColor} size={iconSize} name={"user"} />
			)}
		/>
	) : (
		<DrawerItem
			label="Login"
			onPress={() => {
				navigation.navigate("Login");
			}}
			style={styles.drawerItemView}
			labelStyle={styles.drawerItemLabel}
			icon={({ focused, color, size }) => (
				<Feather color={iconColor} size={iconSize} name={"log-in"} />
			)}
		/>
	);

	const mySubscriptionsDrawerButton = isLoggedIn() ? (
		<DrawerItem
			label="View Active Subscriptions"
			onPress={() => {
				navigation.navigate("ActiveSubscriptions");
			}}
			style={styles.drawerItemView}
			labelStyle={styles.drawerItemLabel}
			icon={({ focused, color, size }) => (
				<Feather color={iconColor} size={iconSize} name={"coffee"} />
			)}
		/>
	) : null;

	const allOrdersDrawerButton = isAdmin ? (
		<DrawerItem
			label="(ADMIN) All User Orders"
			onPress={() => {
				navigation.navigate("ViewOrders");
			}}
			style={styles.drawerItemView}
			labelStyle={styles.drawerItemLabel}
			icon={({ focused, color, size }) => (
				<Feather color={iconColor} size={iconSize} name={"truck"} />
			)}
		/>
	) : null;

	const editCoffeesDrawerButton = isAdmin ? (
		<DrawerItem
			label="(ADMIN) Edit Coffees"
			onPress={() => {
				navigation.navigate("EditCoffees");
			}}
			style={styles.drawerItemView}
			labelStyle={styles.drawerItemLabel}
			icon={({ focused, color, size }) => (
				<Feather color={iconColor} size={iconSize} name={"edit"} />
			)}
		/>
	) : null;

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItem
				label="Home"
				onPress={() => {
					navigation.navigate("Home");
				}}
				style={styles.drawerItemView}
				labelStyle={styles.drawerItemLabel}
				icon={({ focused, color, size }) => (
					<Feather color={iconColor} size={iconSize} name={"home"} />
				)}
			/>
			{accountDrawerButton}
			{mySubscriptionsDrawerButton}
			{allOrdersDrawerButton}
			{editCoffeesDrawerButton}
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	drawerItemView: {
		borderColor: "#581613",
		borderRadius: 5,
		borderWidth: 1,
		justifyContent: "flex-start",
	},
	drawerItemLabel: {
		color: "#581613",
		fontFamily: "HankenGrotesk_600SemiBold",
		fontSize: 20,
		marginLeft: -20,
		marginRight: -32,
	},
});

export default DrawerWindow;
