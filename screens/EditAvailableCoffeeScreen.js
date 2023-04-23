import React, { useState, useEffect, useContext } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	RefreshControl,
	ScrollView,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Feather } from "@expo/vector-icons";
import PopupModal from "../components/PopupModal";
import { useNavigation } from "@react-navigation/native";
import AdminCoffeeListItem from "../components/AdminCoffeeListItem";
import LoginContext from "../context/LoginContext";

SplashScreen.preventAutoHideAsync();

const EditAvailableCoffeeScreen = () => {
	const [coffeeList, setCoffeeList] = useState([]);
	const [modalChildren, setModalChildren] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation();
	const { userToken } = useContext(LoginContext);
	let isCoffeesRefreshing = true;

	useEffect(() => {
		getCoffees();
	}, []);

	async function getCoffees() {
		const getApiUrl = "https://nsdev1.xyz/index.php?method=getCoffees";

		isCoffeesRefreshing = true;
		fetch(getApiUrl)
			.then((response) => response.json())
			.then((json) => setCoffeeList(json))
			.then(() => {
				isCoffeesRefreshing = false;
			})
			.catch((error) => {
				alert("Error" + error);
			});
	}

	const deleteStoreCoffeeAPI = (coffeeId) => {
		const deleteStoreCoffeeAPIurl =
			"https://nsdev1.xyz/index.php?method=del_coffee";

		console.log(coffeeId);

		const deleteData = {
			coffee_id: coffeeId,
		};

		const deleteStoreCoffeeCall = fetch(deleteStoreCoffeeAPIurl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
			body: JSON.stringify(deleteData),
		}).then((resp) => resp.json());

		return deleteStoreCoffeeCall;
	};

	const deleteStoreCoffee = (coffeeId) => {
		return new Promise((resolve, reject) => {
			deleteStoreCoffeeAPI(coffeeId).then((deleteStoreCoffeeCall) => {
				console.log(deleteStoreCoffeeCall);
				if (
					deleteStoreCoffeeCall.success == 1 &&
					deleteStoreCoffeeCall.status == 200
				) {
					alert("Store item deleted");
					resolve();
				} else {
					alert(deleteStoreCoffeeCall.message);
				}
			});
		});
	};

	if (coffeeList.length < 1) {
		return null;
	} else {
		SplashScreen.hideAsync();
	}

	const verticalHairlineDivider = (
		<View
			style={{
				borderRightWidth: StyleSheet.hairlineWidth * 3,
				borderColor: "#9A7B4F",
				marginVertical: 8,
			}}
		/>
	);

	const addCoffeePopup = (
		<View>
			<Text style={popupStyles.headingOne}>Add new coffee?</Text>
			<View style={popupStyles.buttonRow}>
				<TouchableOpacity
					style={popupStyles.buttonRowContainer}
					onPress={() => {
						navigation.navigate("AdminAddCoffee");
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
		<ScrollView
			refreshControl={
				<RefreshControl
					onRefresh={() => {
						getCoffees();
					}}
					refreshing={!isCoffeesRefreshing}
				/>
			}
		>
			<View style={styles.centeredViewStyle}>
				<PopupModal
					modalChildren={modalChildren}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
				<View style={styles.container}>
					<Text style={styles.headingOne}>Available Coffees</Text>
					<View style={{}}>
						<View style={styles.listContainerStyle}>
							<FlatList
								data={coffeeList}
								renderItem={({ item }) => {
									return (
										<AdminCoffeeListItem
											imageUrl={item.coffee_image}
											itemName={item.coffee_name}
											itemId={item.coffee_id}
											itemFlavor={item.coffee_flavor}
											itemProcess={item.process}
											itemLike={item.coffee_like}
											itemPrice={item.price}
											deleteStoreCoffee={deleteStoreCoffee}
											setModalChildren={setModalChildren}
											setModalVisible={setModalVisible}
										/>
									);
								}}
								keyExtractor={(item) => item.coffee_id}
								horizontal
								showsHorizontalScrollIndicator={false}
								ListFooterComponent={
									<View
										style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}
									>
										<TouchableOpacity
											onPress={() => {
												setModalChildren(addCoffeePopup);
												setModalVisible(true);
											}}
										>
											<Feather name="plus-circle" size={50} color="#581613" />
										</TouchableOpacity>
									</View>
								}
								ItemSeparatorComponent={verticalHairlineDivider}
							/>
						</View>
					</View>
				</View>
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
		alignContent: "center",
		justifyContent: "center",
	},
	headingOne: {
		fontSize: 35,
		paddingTop: 25,
		paddingBottom: 5,
		paddingHorizontal: 8,
		fontFamily: "Abel_400Regular",
	},
	listContainerStyle: {
		justifyContent: "center",
		borderWidth: 0,
		paddingHorizontal: 5,
		paddingVertical: 10,
		borderRadius: 5,
		borderColor: "#581613",
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

export default EditAvailableCoffeeScreen;
