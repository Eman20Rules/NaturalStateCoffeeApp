import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginContext from "../context/LoginContext";

function AccountScreen() {
	const { isLoggedIn, userToken } = useContext(LoginContext);
	const [fetchedUserData, setFetchedUserData] = useState(false);

	async function getUserData() {
		var getApiUrl = "https://nsdev1.xyz/index.php?method=getMyUserData";

		var header = {
			Authorization: "Bearer " + userToken,
		};

		fetch(getApiUrl, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + userToken,
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((error) => {
				alert("Error" + error);
			});
	}

	if (!isLoggedIn()) {
		return (
			<View style={style.container}>
				<Text>Not Logged In</Text>
			</View>
		);
	} else {
		if (!fetchedUserData) {
			getUserData();
		}

		return (
			<View style={style.container}>
				<Text>Logged In</Text>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default AccountScreen;
