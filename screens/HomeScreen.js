import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Platform,
	ImageBackground,
	ScrollView,
	Modal,
	TouchableOpacity,
} from "react-native";
import CoffeeCarouselBox from "../components/CoffeeCarouselBox";
import PopupModal from "../components/PopupModal";
import HairlineDivider from "../components/HairlineDivider";
import AppLoading from "expo-app-loading";
import AboutUs from "../components/AboutUs";


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
			alignSelf: "center",
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
			padding: 20,
			marginHorizontal: 10,
		},
		buttonContainerStyle: {
			alignSelf: "flex-start",
			flexDirection: "row",
			alignItems: "center",
			padding: 3,
			marginTop: 10,
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
	});
	const [coffeeList, setCoffeeList] = useState([]);
	const [modalChildren, setModalChildren] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

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

	return (
		<View style={styles.centeredViewStyle}>
			<PopupModal
				modalChildren={modalChildren}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
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
				<HairlineDivider marginVertical={25} marginHorizontal={15} />
				<ImageBackground
					source={require("../assets/images/aboutUsImageBackground.jpg")}
					style={styles.imageBackgroundStyle}
					resizeMode="cover"
				>
					<AboutUs
						setInfoPopup={setModalChildren}
						setInfoVisible={setModalVisible}>
					</AboutUs>
					
				</ImageBackground>
			</ScrollView>
		</View>
	);
};

export default HomeScreen;
