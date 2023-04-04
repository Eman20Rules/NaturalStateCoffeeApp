import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginContext from "../context/LoginContext";

//create your forceUpdate hook
function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return () => setValue((value) => value + 1); // update state to force render
	// A function that increment 👆🏻 the previous state like here
	// is better than directly setting `setValue(value + 1)`
}

function AccountScreen() {
	const forceUpdate = useForceUpdate();
	const { isLoggedIn } = useContext(LoginContext);

	const loggedInTextTag = !isLoggedIn() ? (
		<Text>Not Logged In</Text>
	) : (
		<Text>Logged In</Text>
	);

	return <View style={style.container}>{loggedInTextTag}</View>;
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default AccountScreen;
