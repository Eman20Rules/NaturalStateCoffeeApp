import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from "react-native";
import AppLoading from "expo-app-loading";
import { Feather } from "@expo/vector-icons";

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const EditAvailableCoffeeScreen = () => {
	const [coffeeList, setCoffeeList] = useState([]);

	useEffect(() => {
		getCoffees();
	}, []);

	async function getCoffees() {
		var getApiUrl = "https://nsdev1.xyz/index.php?method=getCoffees";

		fetch(getApiUrl)
			.then((response) => response.json())
			.then((json) => setCoffeeList(json))
			.catch((error) => {
				alert("Error" + error);
			});
	}

	if (coffeeList.length < 1) {
		return <AppLoading />;
	}
	console.log(coffeeList[0]);

	return (
		<View style={styles.centeredViewStyle}>
			<View style={styles.container}>
				<Text style={styles.headingOne}>Available Coffees</Text>
				<FlatList
					data={coffeeList}
					renderItem={({ item }) => {
						return (
							<View>
								<Text>{item.coffee_name}</Text>
							</View>
						);
					}}
					horizontal
					ListFooterComponent={
						<TouchableOpacity>
							<Feather name="plus-circle" size={24} color="#581613" />
						</TouchableOpacity>
					}
				/>
			</View>
		</View>
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
});

export default EditAvailableCoffeeScreen;
