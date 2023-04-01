import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Platform,
	ImageBackground,
	ScrollView,
	Modal,
	Button,
} from "react-native";
import CoffeeCarouselBox from "../components/CoffeeCarouselBox";
import { Feather } from "@expo/vector-icons";

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const HomeScreen = () => {
	const styles = StyleSheet.create({
		containerStyle: {
			width: "100%",
			paddingTop: headerPadding,
			paddingBottom: 150,
		},
		headerOneStyle: {
			fontSize: 35,
			paddingTop: 25,
			paddingBottom: 5,
			paddingHorizontal: 8,
			fontFamily: "Abel_400Regular",
		},
		listContainerStyle: {},
		coffeeCarouselBoxStyle: {
			borderStartWidth: 5,
			borderEndWidth: 5,
		},
		hairlineDividerStyle: {
			borderBottomWidth: StyleSheet.hairlineWidth * 5,
			marginHorizontal: 15,
			marginVertical: 25,
			borderColor: "#9A7B4F",
		},
		imageBackgroundStyle: {
			height: 500,
			alignItems: "center",
			justifyContent: "space-around",
		},
		imageBackgroundTextStyle: {
			color: "white",
			fontFamily: "Abel_400Regular",
			fontSize: 50,
		},
		centeredViewStyle: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		popUpStyle: {
			backgroundColor: "white",
			borderRadius: 5,
			padding: 10,
		},
	});
	const [coffeeList, setCoffeeList] = useState([]);
	const [modalChildren, setModalChildren] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	//This shows a loading screen until the fonts load

	useEffect(() => {
		getCoffees();
	}, []);

	async function getCoffees() {
		var getApiUrl = "http://3.84.255.244/index.php?method=getCoffees";

		fetch(getApiUrl)
			.then((response) => response.json())
			.then((json) => setCoffeeList(json))
			.catch((error) => {
				alert("Error" + error);
			});
	}

	return (
		<View style={styles.centeredViewStyle}>
			<Modal
				transparent={true}
				visible={modalVisible}
				animationType="fade"
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View
					style={[
						styles.centeredViewStyle,
						{ backgroundColor: "rgba(0,0,0,0.5)" },
					]}
				>
					<View style={styles.popUpStyle}>
						{modalChildren}
						<Button title="Close" onPress={() => setModalVisible(false)} />
					</View>
				</View>
			</Modal>
			<ScrollView style={styles.containerStyle}>
				<Text style={styles.headerOneStyle}>Subscriptions</Text>
				<View style={styles.listContainerStyle}>
					<FlatList
						data={coffeeList}
						keyExtractor={(item) => item.coffee_id}
						horizontal
						renderItem={({ index, item }) => {
							return (
								<View
									//	This View tag is responsible for the vertical line. If the view tag is on the last element
									//in the {coffeeList} then it won't render a line to the right
									style={[
										index < coffeeList.length - 1
											? {
													borderRightWidth: StyleSheet.hairlineWidth * 3,
													borderColor: "#9A7B4F",
											  }
											: null,
									]}
								>
									<CoffeeCarouselBox
										coffee={item}
										setInfoPopup={setModalChildren}
										setInfoVisible={setModalVisible}
									/>
								</View>
							);
						}}
					/>
				</View>
				<View style={styles.hairlineDividerStyle} />
				<ImageBackground
					source={require("../assets/images/aboutUsImageBackground.jpg")}
					style={styles.imageBackgroundStyle}
					resizeMode="cover"
				>
					<Text style={styles.imageBackgroundTextStyle}>About Us</Text>
				</ImageBackground>
			</ScrollView>
		</View>
	);
};

export default HomeScreen;
