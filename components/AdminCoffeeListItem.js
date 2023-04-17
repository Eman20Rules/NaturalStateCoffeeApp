import React from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const imageHeight = 200;
const imageWidth = 150;

const AdminCoffeeListItem = ({
	imageUrl,
	itemName,
	itemId,
	deleteStoreCoffee,
	setModalChildren,
	setModalVisible,
}) => {
	const deleteCoffeePopup = (
		<View>
			<Text style={popupStyles.headingOne}>Delete {itemName} from store?</Text>
			<View style={popupStyles.buttonRow}>
				<TouchableOpacity
					style={popupStyles.buttonRowContainer}
					onPress={() => {
						deleteStoreCoffee(itemId);
						setModalVisible(false);
					}}
				>
					<Text style={popupStyles.buttonText}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={popupStyles.buttonRowContainer}
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<Text style={popupStyles.buttonText}>No</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Image source={{ uri: imageUrl }} style={styles.iconImage} />
			<View style={styles.textContainerStyle}>
				<Text style={styles.headingTwo}>{itemName}</Text>
			</View>
			<View style={styles.deleteIconContainer}>
				<TouchableOpacity
					onPress={() => {
						setModalChildren(deleteCoffeePopup);
						setModalVisible(true);
					}}
				>
					<Feather name="x-circle" size={30} color="#581613" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { marginHorizontal: 8 },
	iconImage: {
		resizeMode: "cover",
		height: imageHeight,
		width: imageWidth,
	},
	textContainerStyle: {
		justifyContent: "center",
		height: 80,
	},
	headingTwo: {
		fontSize: 25,
		width: 150,
		textAlign: "center",
		textAlignVertical: "center",
		fontFamily: "Abel_400Regular",
	},
	deleteIconContainer: {
		alignSelf: "center",
	},
});

const popupStyles = StyleSheet.create({
	headingOne: {
		fontSize: 25,
		textAlign: "center",
		fontFamily: "Abel_400Regular",
	},

	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-evenly",
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

export default AdminCoffeeListItem;
