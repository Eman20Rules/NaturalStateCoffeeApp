import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Button,
	Image,
} from "react-native";
import HairlineDivider from "./HairlineDivider";

const imageSize = 100;

const SubscriptionOrderItem = ({
	index,
	coffee_name,
	coffee_image,
	price,
	amount,
	order_date,
	frequency,
	user_coffee_subscription_order_id,
	setModalChildren,
	setModalVisible,
	deleteSubscription,
	updateSubscriptionList,
}) => {
	const infoPopup = (
		<View style={popupStyles.popupContainer}>
			<Text style={popupStyles.headingOne}>{coffee_name}</Text>
			<HairlineDivider marginHorizontal={5} marginVertical={3} />
			<View style={popupStyles.descriptionContainer}>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Price</Text>
					<Text style={popupStyles.bodyText}>${(+price).toFixed(2)}</Text>
				</View>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Quantity</Text>
					<Text style={popupStyles.bodyText}>{amount}</Text>
				</View>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Total</Text>
					<Text style={popupStyles.bodyText}>
						${(price * amount).toFixed(2)}
					</Text>
				</View>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Next Delivery Date</Text>
					<Text style={popupStyles.bodyText}>{order_date}</Text>
				</View>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Frequency</Text>
					<Text style={popupStyles.bodyText}>
						{frequency.charAt(0).toUpperCase() + frequency.slice(1)}
					</Text>
				</View>
			</View>
			<TouchableOpacity
				style={popupStyles.buttonContainer}
				onPress={() => setModalChildren(confirmDeletePopup)}
			>
				<Text style={popupStyles.buttonText}>Delete Subscription</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={popupStyles.buttonContainer}
				onPress={() => setModalVisible(false)}
			>
				<Text style={popupStyles.buttonText}>Close</Text>
			</TouchableOpacity>
		</View>
	);

	const confirmDeletePopup = (
		<View>
			<Text style={popupStyles.headingOne}>
				Are you sure you want to delete this subscription?
			</Text>
			<View style={popupStyles.buttonRow}>
				<TouchableOpacity
					style={popupStyles.buttonRowContainer}
					onPress={() => {
						deleteSubscription(user_coffee_subscription_order_id).then(() => {
							updateSubscriptionList();
						});
						setModalVisible(false);
					}}
				>
					<Text style={popupStyles.buttonText}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={popupStyles.buttonRowContainer}
					onPress={() => setModalVisible(false)}
				>
					<Text style={popupStyles.buttonText}>No</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View style={styles.subscriptionItemContainer}>
			<Text style={styles.subscriptionNumberText}>{index + 1}</Text>
			<Image src={coffee_image} style={styles.subscriptionImage} />
			<View style={styles.infoAndEditButtonContainer}>
				<View style={styles.nameAndPriceContainer}>
					<Text style={styles.subscriptionName}>{coffee_name}</Text>
					<Text style={styles.priceStyle}>
						${(+price).toFixed(2)}&#215;
						{amount}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.editButtonContainer}
					onPress={() => {
						setModalChildren(infoPopup);
						setModalVisible(true);
						console.log(user_coffee_subscription_order_id);
					}}
				>
					<Text style={styles.editButtonText}>Info</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	subscriptionItemContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	subscriptionNumberText: {
		width: 20,
		textAlign: "center",
		color: "#9A7B4F",
	},
	subscriptionImage: {
		height: imageSize,
		width: imageSize,
		marginRight: 10,
		marginLeft: 5,
		backgroundColor: "gray",
		borderWidth: 1,
	},
	infoAndEditButtonContainer: {
		justifyContent: "space-evenly",
		height: imageSize,
		flex: 1,
		height: imageSize,
	},
	nameAndPriceContainer: {
		flexDirection: "row",
	},
	subscriptionName: {
		fontFamily: "Abel_400Regular",
		fontSize: 20,
		flex: 1,
		marginRight: 5,
	},
	priceStyle: {
		fontFamily: "Abel_400Regular",
		fontSize: 16,
	},
	editButtonContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginTop: 10,
		borderColor: "#581613",
		borderWidth: 1,
		width: "100%",
	},
	editButtonText: {
		fontSize: 23,
		flex: 1,
		color: "#581613",
		fontFamily: "HankenGrotesk_300Light",
		textAlign: "center",
	},
});

const popupStyles = StyleSheet.create({
	popupContainer: {
		width: "70%",
	},
	headingOne: {
		fontSize: 25,
		textAlign: "center",
		fontFamily: "Abel_400Regular",
	},
	descriptionContainer: {
		marginBottom: 5,
	},
	descriptionGrouping: {
		padding: 4,
	},
	headingTwo: {
		fontFamily: "HankenGrotesk_600SemiBold",
		textAlign: "center",
		fontSize: 15,
	},
	bodyText: {
		fontFamily: "Abel_400Regular",
		textAlign: "center",
		fontSize: 15,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	buttonContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		borderColor: "#581613",
		borderWidth: 1,
		width: "100%",
	},
	buttonRowContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		borderColor: "#581613",
		borderWidth: 1,
		width: "30%",
	},
	buttonText: {
		fontSize: 17,
		flex: 1,
		color: "#581613",
		fontFamily: "HankenGrotesk_300Light",
		paddingLeft: 5,
		textAlign: "center",
	},
});

export default SubscriptionOrderItem;
