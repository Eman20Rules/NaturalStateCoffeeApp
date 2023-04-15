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
	subscriptionItem,
	setModalChildren,
	setModalVisible,
}) => {
	const infoPopup = (
		<View style={popupStyles.popupContainer}>
			<Text style={popupStyles.headingOne}>{subscriptionItem.coffee_name}</Text>
			<HairlineDivider marginHorizontal={5} marginVertical={3} />
			<View style={popupStyles.descriptionContainer}>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Price</Text>
					<Text style={popupStyles.bodyText}>
						${(+subscriptionItem.price).toFixed(2)}
					</Text>
				</View>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Quantity</Text>
					<Text style={popupStyles.bodyText}>{subscriptionItem.amount}</Text>
				</View>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Total</Text>
					<Text style={popupStyles.bodyText}>
						${(subscriptionItem.price * subscriptionItem.amount).toFixed(2)}
					</Text>
				</View>
				<View style={popupStyles.descriptionGrouping}>
					<Text style={popupStyles.headingTwo}>Next Delivery Date</Text>
					<Text style={popupStyles.bodyText}>
						{subscriptionItem.order_date}
					</Text>
				</View>
			</View>
			<TouchableOpacity style={popupStyles.buttonContainer}>
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

	return (
		<View style={styles.subscriptionItemContainer}>
			<Text style={styles.subscriptionNumberText}>{index + 1}</Text>
			<Image
				src={subscriptionItem.coffee_image}
				style={styles.subscriptionImage}
			/>
			<View style={styles.infoAndEditButtonContainer}>
				<View style={styles.nameAndPriceContainer}>
					<Text style={styles.subscriptionName}>
						{subscriptionItem.coffee_name}
					</Text>
					<Text style={styles.priceStyle}>
						${(+subscriptionItem.price).toFixed(2)}&#215;
						{subscriptionItem.amount}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.editButtonContainer}
					onPress={() => {
						setModalChildren(infoPopup);
						setModalVisible(true);
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
