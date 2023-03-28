import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const imageHeight = 200;
const imageWidth = 150;

const CoffeeCarouselBox = ({ coffee_name, coffee_image }) => {
	return (
		<View style={styles.containerStyle}>
			<View style={styles.imageContainerStyle}>
				<Image source={{ uri: coffee_image }} style={styles.imageStyle} />
			</View>
			<View style={styles.textContainerStyle}>
				<Text style={styles.textStyle}>{coffee_name}</Text>
			</View>
			<TouchableOpacity style={styles.buttonContainerStyle}>
				<Feather name="info" size={24} color="#581613" />
				<Text style={styles.subscriptionButtonStyle}>Info</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.buttonContainerStyle}>
				<Feather name="shopping-cart" size={24} color="#581613" />
				<Text style={styles.subscriptionButtonStyle}>Add to Cart</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	containerStyle: {
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	imageStyle: {
		resizeMode: "cover",
		height: imageHeight,
		width: imageWidth,
	},
	imageContainerStyle: {},
	textStyle: {
		fontSize: 25,
		width: 150,
		textAlign: "center",
		textAlignVertical: "auto",
		fontFamily: "Abel_400Regular",
	},
	textContainerStyle: {
		justifyContent: "center",
		height: 80,
		marginBottom: 10,
	},

	buttonContainerStyle: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		borderColor: "#581613",
		borderWidth: 1,
	},
	subscriptionButtonStyle: {
		fontSize: 20,
		color: "#581613",
		fontFamily: "HankenGrotesk_300Light",
	},
});

export default CoffeeCarouselBox;
