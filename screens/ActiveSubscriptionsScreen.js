import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SubscriptionOrderItem from "../components/SubscriptionOrderItem";
import MySubscriptionsContext from "../context/MySubscriptionsContext";
import LoginContext from "../context/LoginContext";
import HairlineDivider from "../components/HairlineDivider";
import AppLoading from "expo-app-loading";
import PopupModal from "../components/PopupModal";

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const ActiveSubscriptionsScreen = () => {
	const {
		mySubscriptionList,
		updateSubscriptionList,
		deleteSubscription,
		isSubscriptionsRetrieved,
	} = useContext(MySubscriptionsContext);
	const { userToken, isLoggedIn } = useContext(LoginContext);
	const [modalChildren, setModalChildren] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	useFocusEffect(
		React.useCallback(() => {
			if (isLoggedIn()) {
				updateSubscriptionList();
			}
		}, [])
	);

	if (!isSubscriptionsRetrieved) {
		return <AppLoading />;
	}

	const allSubscriptionItems =
		isLoggedIn() && mySubscriptionList.length > 0 ? (
			<FlatList
				data={mySubscriptionList}
				keyExtractor={(item) => item.user_coffee_subscription_id}
				renderItem={({ item, index }) => {
					return (
						<SubscriptionOrderItem
							coffee_name={item.coffee_name}
							coffee_image={item.coffee_image}
							price={item.price}
							amount={item.amount}
							order_date={item.order_date}
							frequency={item.frequency}
							user_coffee_subscription_order_id={
								item.user_coffee_subscription_id
							}
							index={index}
							setModalChildren={setModalChildren}
							setModalVisible={setModalVisible}
							deleteSubscription={deleteSubscription}
							updateSubscriptionList={updateSubscriptionList}
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
			onRefresh={() => {
				updateSubscriptionList();
			}}
			refreshing={!isSubscriptionsRetrieved}
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
