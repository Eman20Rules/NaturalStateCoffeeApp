import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import LoginContext from "../context/LoginContext";

const DrawerWindow = (props) => {
	const { navigation } = props;
	const { isLoggedIn, isAdmin } = useContext(LoginContext);

	const accountDrawerButton = isLoggedIn() ? (
		<DrawerItem
			label="Account"
			onPress={() => {
				navigation.closeDrawer();
				navigation.navigate("Account");
			}}
			style={styles.drawerItemView}
			labelStyle={styles.drawerItemLabel}
		/>
	) : (
		<DrawerItem
			label="Login"
			onPress={() => {
				navigation.navigate("Login");
			}}
			style={styles.drawerItemView}
			labelStyle={styles.drawerItemLabel}
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
		/>
	) : null;

	const editCoffeesDrawerButton = isAdmin ? (
		<DrawerItem
			label="(ADMIN) Edit Available Coffees"
			onPress={() => {
				navigation.navigate("EditCoffees");
			}}
			style={styles.drawerItemView}
			labelStyle={styles.drawerItemLabel}
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
	},
	drawerItemLabel: {
		color: "#581613",
		fontFamily: "HankenGrotesk_600SemiBold",
		fontSize: 18,
	},
});

export default DrawerWindow;
