import React, { useState, useContext } from "react";
import {
	StyleSheet,
	Button,
	View,
	TouchableOpacity,
	Text,
	ScrollView,
} from "react-native";
import { DataTable, Checkbox } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import PopupModal from "../components/PopupModal";
import LoginContext from "../context/LoginContext";

function ViewOrdersScreen() {
	const [modalChildren, setModalChildren] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [currentOrderData, setCurrentOrderData] = useState([]);
	const [pastOrderData, setPastOrderData] = useState([]);
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const { userToken } = useContext(LoginContext);

	function searchForCurrentOrders() {
		if (month == "") {
			alert("Month must be selected!");
			return;
		}

		if (year == "") {
			alert("Year must be selected!");
			return;
		}

		getCurrentOrdersApiCall().then((apiData) => {
			if (apiData.status != 200) {
				alert(apiData.message);
				return;
			}
			setPastOrderData([]);
			setCurrentOrderData(apiData.orders);
		});
	}

	function searchForPastOrders() {
		if (month == "") {
			alert("Month must be selected!");
			return;
		}

		if (year == "") {
			alert("Year must be selected!");
			return;
		}

		getPastOrdersApiCall().then((apiData) => {
			if (apiData.status != 200) {
				alert(apiData.message);
				return;
			}
			setCurrentOrderData([]);
			setPastOrderData(apiData.orders);
		});
	}

	function getCurrentOrdersApiCall() {
		var getApiUrl = "https://nsdev1.xyz/index.php?method=getAllOrders";

		var data = {
			date: month + "/" + year,
		};

		const getOrdersApiCall = fetch(getApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
			body: JSON.stringify(data),
		})
			.then((resp) => resp.json())
			.catch((error) => {
				alert("Error" + error);
			});

		return getOrdersApiCall;
	}

	function getPastOrdersApiCall() {
		var getApiUrl = "https://nsdev1.xyz/index.php?method=getAllPastOrders";

		var data = {
			date: month + "/" + year,
		};

		const getOrdersApiCall = fetch(getApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
			body: JSON.stringify(data),
		})
			.then((resp) => resp.json())
			.catch((error) => {
				alert("Error" + error);
			});

		return getOrdersApiCall;
	}

	const monthSelectData = [
		{ key: "01", value: "1" },
		{ key: "02", value: "2" },
		{ key: "03", value: "3" },
		{ key: "04", value: "4" },
		{ key: "05", value: "5" },
		{ key: "06", value: "6" },
		{ key: "07", value: "7" },
		{ key: "08", value: "8" },
		{ key: "09", value: "9" },
		{ key: "10", value: "10" },
		{ key: "11", value: "11" },
		{ key: "12", value: "12" },
	];

	const yearSelectData = [
		{ key: "2020", value: "2020" },
		{ key: "2021", value: "2021" },
		{ key: "2022", value: "2022" },
		{ key: "2023", value: "2023" },
		{ key: "2024", value: "2024" },
		{ key: "2025", value: "2025" },
		{ key: "2026", value: "2026" },
		{ key: "2027", value: "2027" },
		{ key: "2028", value: "2028" },
		{ key: "2029", value: "2029" },
		{ key: "2030", value: "2030" },
		{ key: "2031", value: "2031" },
		{ key: "2032", value: "2032" },
		{ key: "2033", value: "2033" },
		{ key: "2034", value: "2034" },
		{ key: "2035", value: "2035" },
		{ key: "2036", value: "2036" },
		{ key: "2037", value: "2037" },
		{ key: "2038", value: "2038" },
		{ key: "2039", value: "2039" },
		{ key: "2040", value: "2040" },
		{ key: "2041", value: "2041" },
		{ key: "2042", value: "2042" },
		{ key: "2043", value: "2043" },
		{ key: "2044", value: "2044" },
		{ key: "2045", value: "2045" },
		{ key: "2046", value: "2046" },
		{ key: "2047", value: "2047" },
		{ key: "2048", value: "2048" },
		{ key: "2049", value: "2049" },
		{ key: "2050", value: "2050" },
		{ key: "2051", value: "2051" },
		{ key: "2052", value: "2052" },
		{ key: "2053", value: "2053" },
		{ key: "2054", value: "2054" },
		{ key: "2055", value: "2055" },
		{ key: "2056", value: "2056" },
		{ key: "2057", value: "2057" },
		{ key: "2058", value: "2058" },
		{ key: "2059", value: "2059" },
		{ key: "2060", value: "2060" },
		{ key: "2061", value: "2061" },
		{ key: "2062", value: "2062" },
		{ key: "2063", value: "2063" },
		{ key: "2064", value: "2064" },
		{ key: "2065", value: "2065" },
		{ key: "2066", value: "2066" },
		{ key: "2067", value: "2067" },
		{ key: "2068", value: "2068" },
		{ key: "2069", value: "2069" },
		{ key: "2070", value: "2070" },
		{ key: "2071", value: "2071" },
		{ key: "2072", value: "2072" },
		{ key: "2073", value: "2073" },
		{ key: "2074", value: "2074" },
		{ key: "2075", value: "2075" },
	];

	function createModalInfo(order) {
		if (order.user_coffee_subscription_id) {
			var isDelivered = order.delivered == 1;
		} else {
			var isDelivered = true;
		}

		if (isDelivered) {
			var text = "Mark Undelivered";
		} else {
			var text = "Mark Delivered";
		}

		var deliverButton = (
			<View style={styles.viewSearchPaddingFirst}>
				<TouchableOpacity
					style={styles.modalButtonContainerStyle}
					onPress={() => toggleDelivered(order, isDelivered)}
				>
					<Text style={styles.subscriptionButtonStyle}>{text}</Text>
				</TouchableOpacity>
			</View>
		);

		var modalInfo = (
			<View>
				<Text style={styles.infoTitleStyle}>Order Information</Text>

				<View style={styles.hairlineDividerStyle} />

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.name}</Text>
				</View>

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.email}</Text>
				</View>

				<View style={styles.subHairlineDividerStyle} />

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						Delivery Date:&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.order_date}</Text>
				</View>

				<View style={styles.subHairlineDividerStyle} />

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>Coffee Ordered:</Text>
					<Text style={styles.infoBodyStyle}>{order.coffee_name}</Text>
				</View>

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						Frequency:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.frequency}</Text>
				</View>

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						Amount:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.amount}</Text>
				</View>

				<View style={styles.subHairlineDividerStyle} />

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						Street:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.street}</Text>
				</View>

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						City:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.city}</Text>
				</View>

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						State:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.state}</Text>
				</View>

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						Country:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.country}</Text>
				</View>

				<View style={styles.infoGroupingStyle}>
					<Text style={styles.infoHeaderStyle}>
						Zipcode:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</Text>
					<Text style={styles.infoBodyStyle}>{order.zipcode}</Text>
				</View>

				<View style={styles.subHairlineDividerStyle} />

				<View style={styles.buttonFlexStyle}>
					{deliverButton}

					<View style={styles.viewSearchPadding}>
						<TouchableOpacity
							style={styles.modalButtonContainerStyle}
							onPress={() => setModalVisible(false)}
						>
							<Text style={styles.subscriptionButtonStyle}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);

		setModalChildren(modalInfo);

		setModalVisible(true);
	}

	function toggleDelivered(order, isDelivered) {
		if (order.user_coffee_subscription_id) {
			var isCurrent = true;
			var id = order.user_coffee_subscription_id;
		} else {
			var isCurrent = false;
			var id = order.past_subscription_id;
		}

		toggleDeliveredAPICall(id, isDelivered, isCurrent).then((apiData) => {
			if (apiData.status != 200) {
				return;
			}

			if (isCurrent) {
				setCurrentOrderData([]);
				searchForCurrentOrders();
			} else {
				setPastOrderData([]);
				searchForPastOrders();
			}

			setModalVisible(false);
		});
	}

	function toggleDeliveredAPICall(id, isDelivered, isCurrent) {
		//url depends on if order is past order, delivered or undelivered
		if (isCurrent && isDelivered) {
			var apiUrl = "https://nsdev1.xyz/index.php?method=mark_undelivered";
		} else if (isCurrent) {
			var apiUrl = "https://nsdev1.xyz/index.php?method=mark_delivered";
		} else {
			var apiUrl =
				"https://nsdev1.xyz/index.php?method=mark_past_order_undelivered";
		}

		var data = {
			user_subscription_ids: [id],
		};

		const toggleDeliveredApiCall = fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
			body: JSON.stringify(data),
		})
			.then((resp) => resp.json())
			.catch((error) => {
				alert("Error" + error);
			});

		return toggleDeliveredApiCall;
	}

	return (
		<View style={styles.container}>
			<ScrollView style={{ width: "100%" }}>
				<PopupModal
					modalChildren={modalChildren}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
				<Text style={styles.headingOne}>All User Orders</Text>
				<View style={styles.selectSubContainer}>
					<SelectList
						boxStyles={styles.select}
						setSelected={(input) => setMonth(input)}
						data={monthSelectData}
						search={false}
						placeholder="Month:"
					/>

					<SelectList
						boxStyles={styles.select}
						setSelected={(input) => setYear(input)}
						data={yearSelectData}
						search={false}
						placeholder="Year:"
					/>
				</View>

				<View style={styles.buttonFlexStyle}>
					<View style={styles.viewPadding}>
						<TouchableOpacity
							style={styles.searchButtonContainerStyle}
							onPress={searchForCurrentOrders}
						>
							<Text style={styles.searchButtonStyle}>Current Orders</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.viewPadding}>
						<TouchableOpacity
							style={styles.searchButtonContainerStyle}
							onPress={searchForPastOrders}
						>
							<Text style={styles.searchButtonStyle}>Past orders</Text>
						</TouchableOpacity>
					</View>
				</View>

				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Orders:</DataTable.Title>
					</DataTable.Header>
					<DataTable.Header>
						<DataTable.Title>Name</DataTable.Title>
						<DataTable.Title numeric>Date</DataTable.Title>
						<DataTable.Title numeric>Delivered?</DataTable.Title>
					</DataTable.Header>

					{currentOrderData.map((order) => {
						return (
							<DataTable.Row
								key={order.user_coffee_subscription_id}
								onPress={() => {
									createModalInfo(order);
								}}
							>
								<DataTable.Cell>{order.name}</DataTable.Cell>
								<DataTable.Cell numeric>{order.order_date}</DataTable.Cell>
								<DataTable.Cell
									numeric
									onPress={() => {
										createModalInfo(order);
									}}
								>
									<Checkbox
										status={order.delivered == 1 ? "checked" : "unchecked"}
										onPress={() => {
											console.log(
												"Check box for order id: ",
												order.user_coffee_subscription_id
											);
										}}
									/>
								</DataTable.Cell>
							</DataTable.Row>
						);
					})}

					{pastOrderData.map((order) => {
						return (
							<DataTable.Row
								key={order.past_subscription_id}
								onPress={() => {
									createModalInfo(order);
								}}
							>
								<DataTable.Cell>{order.name}</DataTable.Cell>
								<DataTable.Cell numeric>{order.order_date}</DataTable.Cell>
								<DataTable.Cell
									numeric
									onPress={() => {
										createModalInfo(order);
									}}
								>
									<Checkbox
										status={"checked"}
										onPress={() => {
											console.log(
												"Check box for order id: ",
												order.user_coffee_subscription_id
											);
										}}
									/>
								</DataTable.Cell>
							</DataTable.Row>
						);
					})}
				</DataTable>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F5F5F5",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
		paddingBottom: "15%",
	},
	headingOne: {
		fontSize: 35,
		paddingBottom: 10,
		paddingTop: 20,
		paddingHorizontal: 8,
		fontFamily: "Abel_400Regular",
	},
	selectContainer: {
		backgroundColor: "#F5F5F5",
		flexDirection: "row",
		// alignItems: "center",
		paddingTop: "20%",
		paddingBottom: "5%",
	},
	selectSubContainer: {
		backgroundColor: "#F5F5F5",
		alignItems: "center",
		justifyContent: "space-around",
		flexDirection: "row",
		paddingBottom: 20,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "80%",
	},
	searchButton: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "80%",
		paddingBottom: "20%",
		paddingTop: "20%",
	},
	select: {},
	infoTitleStyle: {
		fontSize: 25,
		textAlign: "center",
	},
	hairlineDividerStyle: {
		borderBottomWidth: StyleSheet.hairlineWidth * 5,
		marginHorizontal: 2,
		marginVertical: 5,
		borderColor: "#9A7B4F",
	},
	subHairlineDividerStyle: {
		borderBottomWidth: StyleSheet.hairlineWidth * 2.5,
		marginHorizontal: 2,
		marginVertical: 5,
		borderColor: "#9A7B4F",
	},
	infoGroupingStyle: {
		padding: 4,
		flexDirection: "row",
	},
	infoHeaderStyle: {
		textAlign: "left",
		paddingRight: "10%",
	},
	infoBodyStyle: {
		// textAlign: "right",
	},
	searchButtonContainerStyle: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		borderColor: "#581613",
		borderWidth: 1,
	},

	modalButtonContainerStyle: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		borderColor: "#581613",
		borderWidth: 1,
	},
	subscriptionButtonStyle: {
		fontSize: 17,
		flex: 1,
		color: "#581613",
		paddingLeft: 5,
		textAlign: "center",
	},
	searchButtonStyle: {
		color: "#581613",
		textAlign: "center",
		fontSize: 20,
	},
	searchText: {
		paddingBottom: "2%",
		fontSize: 28,
		paddingLeft: "5%",
	},
	buttonFlexStyle: {
		flexDirection: "row",
		alignSelf: "center",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-around",
	},
	viewPadding: {},
	viewSearchPadding: {
		paddingRight: "10%",
		width: "40%",
	},
	viewSearchPaddingFirst: {
		paddingRight: "10%",
		width: "60%",
	},
	viewPaddingFirst: {
		paddingRight: "10%",
		paddingLeft: "5%",
	},
});

export default ViewOrdersScreen;
