import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SubscriptionOrderItem from "../components/SubscriptionOrderItem";
import MySubscriptionsContext from "../context/MySubscriptionsContext";
import LoginContext from "../context/LoginContext";
import HairlineDivider from "../components/HairlineDivider";
import AppLoading from "expo-app-loading";
import PopupModal from "../components/PopupModal";

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const ActiveSubscriptionsScreen = () => {
	const { mySubscriptionList, updateSubscriptionList, mySubscriptionsLoaded } =
		useContext(MySubscriptionsContext);
	const { userToken, isLoggedIn } = useContext(LoginContext);
	const [modalChildren, setModalChildren] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	//useFocusEffect runs the callBack function whenever the screen
	//is focused using the navigation library.
	useFocusEffect(
		React.useCallback(() => {
			if (isLoggedIn()) {
				updateSubscriptionList(userToken);
			}
		}, [])
	);

	const allSubscriptionItems = isLoggedIn() ? (
		<FlatList
			data={mySubscriptionList}
			keyExtractor={(item) => item.user_coffee_subscription_id}
			renderItem={({ item, index }) => {
				return (
					<SubscriptionOrderItem
						subscriptionItem={item}
						index={index}
						setModalChildren={setModalChildren}
						setModalVisible={setModalVisible}
					/>
				);
			}}
			ItemSeparatorComponent={
				<HairlineDivider marginVertical={8} marginHorizontal={0} />
			}
		/>
	) : (
		<Text style={styles.noSubscriptionsText}>No Subscriptions</Text>
	);

	const screen = [
		<View style={styles.centeredViewStyle}>
			<PopupModal
				modalChildren={modalChildren}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
			<View style={styles.container}>
				<Text style={styles.headingOne}>My Subscriptions</Text>
				<View style={styles.allSubscriptionsContainer}>
					{allSubscriptionItems}
				</View>
				<Text style={styles.headingOne}>{mySubscriptionList.length || 0}</Text>
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
	centeredView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		width: "100%",
		height: "100%",
		paddingTop: headerPadding,
		paddingBottom: 100,
		paddingHorizontal: 20,
	},
	headingOne: {
		fontSize: 35,
		paddingTop: 25,
		paddingBottom: 5,
		paddingHorizontal: 8,
		fontFamily: "Abel_400Regular",
	},
	allSubscriptionsContainer: {
		borderColor: "#c9d1cb",
		borderWidth: 2,
		minHeight: 50,
		justifyContent: "center",
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	noSubscriptionsText: {
		fontFamily: "Abel_400Regular",
		fontSize: 30,
		marginVertical: 20,
		alignSelf: "center",
	},
});

export default ActiveSubscriptionsScreen;
