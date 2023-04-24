import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const AboutUs = ({ setInfoPopup, setInfoVisible }) => {
	const styles = StyleSheet.create({
		containerStyle: {
			alignItems: "center",
			paddingVertical: 10,
			paddingHorizontal: 20,
		},
		infoTitleStyle: {
			fontSize: 30,
			textAlign: "center",
			fontFamily: "Abel_400Regular",
		},
		hairlineDividerStyle: {
			borderBottomWidth: StyleSheet.hairlineWidth * 5,
			marginHorizontal: 2,
			marginVertical: 5,
			borderColor: "#9A7B4F",
		},
		headerOneStyle: {
			fontSize: 48,
			color: "#ffffff",
			paddingTop: 0,
			paddingBottom: 0,
			paddingHorizontal: 8,
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
			fontSize: 25,
			flex: 1,
			color: "#581613",
			fontFamily: "HankenGrotesk_300Light",
			paddingLeft: 5,
			textAlign: "center",
		},
		infoBodyStyle: {
			fontFamily: "Abel_400Regular",
			textAlign: "center",
			fontSize: 20,
		},
		infoGroupingStyle: {
			padding: 4,
		},
	});

	const coffeeInfo = (
		<View>
			<Text style={styles.infoTitleStyle}>Hi!</Text>
			<View style={styles.hairlineDividerStyle} />
			<View style={styles.infoGroupingStyle}>
				<Text style={styles.infoBodyStyle}>
					Natural State Coffee Roasters is the coffee roasting arm of Midtown
					Coffee. We enjoy roasting great coffees to serve in our shops as well
					as bagged coffee for your home brewing enjoyment.
					{"\n"}
				</Text>
				<Text style={styles.infoBodyStyle}>
					This app was made for fellow coffee lovers looking for monthly
					deliveries right to their door. ☕
				</Text>
			</View>
			<TouchableOpacity
				style={styles.buttonContainerStyle}
				onPress={() => setInfoVisible(false)}
			>
				<Text style={styles.subscriptionButtonStyle}>Close</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.containerStyle}>
			<TouchableOpacity
				onPress={() => {
					setInfoPopup(coffeeInfo);
					setInfoVisible(true);
				}}
			>
				<Text style={styles.headerOneStyle}>About Us</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AboutUs;
