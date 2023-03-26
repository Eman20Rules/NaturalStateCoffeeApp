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
				<Feather name="info" size={24} color="gray" />
				<Text style={styles.subscriptionButtonStyle}>Info</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.buttonContainerStyle}>
				<Feather name="shopping-cart" size={24} color="gray" />
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
	imageContainerStyle: {
		paddingBottom: 5,
	},
	textStyle: {
		fontSize: 18,
		width: 150,
		textAlign: "center",
		textAlignVertical: "auto",
		marginBottom: 10,
	},
	textContainerStyle: { justifyContent: "center", height: 60 },

	buttonContainerStyle: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	subscriptionButtonStyle: {
		fontSize: 30,
		color: "gray",
	},
});

export default CoffeeCarouselBox;
