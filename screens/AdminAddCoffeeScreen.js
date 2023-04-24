import React, { useState, useContext } from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Platform,

} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AdminNewCoffeeField from "../components/AdminNewCoffeeField";
import LoginContext from "../context/LoginContext";

const AdminAddCoffeeScreen = () => {
	const { userToken } = useContext(LoginContext);
	const [coffeeName, setCoffeeName] = useState("");
	const [coffeeFlavor, setCoffeeFlavor] = useState("");
	const [coffeeProcess, setCoffeeProcess] = useState("");
	const [coffeeLikes, setCoffeeLikes] = useState("");
	const [coffeeImage, setCoffeeImage] = useState("");
	const [coffeePrice, setCoffeePrice] = useState("");
	const navigation = useNavigation();

	const addCoffeeAPI = () => {
		const addCoffeeAPIurl = "https://nsdev1.xyz/index.php?method=new_coffee";

		const data = {
			coffee_name: coffeeName,
			coffee_flavor: coffeeFlavor,
			process: coffeeProcess,
			coffee_like: coffeeLikes,
			coffee_image: coffeeImage,
			price: coffeePrice,
		};

		const addCoffeeCall = fetch(addCoffeeAPIurl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
			body: JSON.stringify(data),
		}).then((resp) => resp.json());

		return addCoffeeCall;
	};

	const isAllFieldsValid = () => {
		if (!coffeeName) {
			alert("Enter Coffee Name");
			return false;
		}

		if (!coffeeFlavor) {
			alert("Enter Coffee Flavor");
			return false;
		}

		if (!coffeeProcess) {
			alert("Enter Coffee Process");
			return false;
		}

		if (!coffeeLikes) {
			alert("Enter what we like about this coffee");
			return false;
		}

		if (!coffeeImage) {
			alert("Enter coffee image URL");
			return false;
		}

		if (!coffeePrice) {
			alert("Enter coffee price");
			return false;
		}

		if (coffeePrice.at(0) == "$") {
			setCoffeePrice(coffeePrice.slice(1));
		}

		if (!isFinite(+coffeePrice)) {
			alert("Enter a valid price");
			return false;
		}

		return true;
	};

	const submitNewCoffee = () => {
		return new Promise((resolve, reject) => {
			if (!isAllFieldsValid()) {
				reject();
				return;
			}
			addCoffeeAPI().then((addCoffeeCall) => {
				if (addCoffeeCall.status == 200 && addCoffeeCall.success == 1) {
					alert("Coffee Created");
					resolve();
				} else {
					alert(addCoffeeCall.message);
				}
			});
		});
	};

	return (
		<ScrollView style={styles.centeredViewStyle}>
			<View style={styles.container}>
				<Text style={styles.headingOne}>Add Coffee</Text>
				<View style={styles.coffeeFieldsContainer}>
					<AdminNewCoffeeField
						fieldHeader={"Coffee Name:"}
						fieldChange={setCoffeeName}
						fieldData={coffeeName}
						placeHolder={"Guatemala"}
					/>
					<AdminNewCoffeeField
						fieldHeader={"Coffee Flavor:"}
						fieldChange={setCoffeeFlavor}
						fieldData={coffeeFlavor}
						placeHolder={"Rich, Earthy, etc."}
					/>
					<AdminNewCoffeeField
						fieldHeader={"Coffee Process:"}
						fieldChange={setCoffeeProcess}
						fieldData={coffeeProcess}
						placeHolder={"Washed 1500ft"}
					/>
					<AdminNewCoffeeField
						fieldHeader={"What we like about this coffee:"}
						fieldChange={setCoffeeLikes}
						fieldData={coffeeLikes}
						placeHolder={"A vibrant balanced coffee"}
					/>
					<AdminNewCoffeeField
						fieldHeader={"Image URL:"}
						fieldChange={setCoffeeImage}
						fieldData={coffeeImage}
						placeHolder={"https://imageLink.com"}
					/>
					<AdminNewCoffeeField
						fieldHeader={"Price:"}
						fieldChange={setCoffeePrice}
						fieldData={coffeePrice}
						placeHolder={"15.00"}
					/>
				</View>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => {
						submitNewCoffee()
							.then((resolve) => navigation.goBack())
							.catch((reject) => {});
					}}
				>
					<Text style={styles.buttonText}>Submit Coffee</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => {
						navigation.goBack();
					}}
				>
					<Text style={styles.buttonText}>Cancel</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
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
	coffeeFieldsContainer: {
		marginBottom: 10,
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
		fontSize: 25,
		flex: 1,
		color: "#581613",
		fontFamily: "HankenGrotesk_300Light",
		paddingLeft: 5,
		textAlign: "center",
	},
});

export default AdminAddCoffeeScreen;
