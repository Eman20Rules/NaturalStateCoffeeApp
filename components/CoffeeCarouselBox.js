import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Modal,
	Button,
	Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const imageHeight = 200;
const imageWidth = 150;

const CoffeeCarouselBox = ({ coffee, setInfoPopup, setInfoVisible }) => {
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
			width: "100%",
		},
		subscriptionButtonStyle: {
			fontSize: 17,
			flex: 1,
			color: "#581613",
			fontFamily: "HankenGrotesk_300Light",
			paddingLeft: 5,
			textAlign: "center",
		},
		modalStyle: {
			position: "absolute",
			left: "50%",
			right: "50%",
		},
		modalViewStyle: {
			height: "100%",
		},
	});

	const coffeeInfo = (
		<View>
			<Text>Flavor Notes: {coffee.coffee_flavor}</Text>
			<Text>Process: {coffee.process}</Text>
			<Text>What we like about this coffee: {coffee.coffee_like}</Text>
		</View>
	);

	return (
		<View style={styles.containerStyle}>
			<View style={styles.imageContainerStyle}>
				<Image
					source={{ uri: coffee.coffee_image }}
					style={styles.imageStyle}
				/>
			</View>
			<View style={styles.textContainerStyle}>
				<Text style={styles.textStyle}>{coffee.coffee_name}</Text>
			</View>
			<TouchableOpacity
				style={styles.buttonContainerStyle}
				onPress={() => {
					setInfoPopup(coffeeInfo);
					setInfoVisible(true);
				}}
			>
				<Feather
					name="info"
					size={24}
					color="#581613"
					style={{ position: "absolute", left: 2 }}
				/>
				<Text style={styles.subscriptionButtonStyle}>Info</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.buttonContainerStyle}>
				<Feather
					name="shopping-cart"
					size={24}
					color="#581613"
					style={{ position: "absolute", left: 2 }}
				/>
				<Text style={styles.subscriptionButtonStyle}>Add to Cart</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CoffeeCarouselBox;
