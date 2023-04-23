import React, { useContext } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import LoginContext from "../context/LoginContext";
import MySubscriptionsContext from "../context/MySubscriptionsContext";

function LoginScreen({ navigation }) {
	const {
		isLoggedIn,
		setSecurityInfo,
		email,
		setEmail,
		password,
		setPassword,
	} = useContext(LoginContext);

	const { updateSubscriptionList } = useContext(MySubscriptionsContext);

	function login() {
		if (email.length == 0) {
			alert("Email is Required");
			return;
		}

		if (password.length == 0) {
			alert("Password is Required");
			return;
		}

		loginAPICall().then((loginInfo) => {
			if (loginInfo.status == 200) {
				const isAdmin = loginInfo.is_admin == 1 ? true : false;
				setSecurityInfo(loginInfo.token, isAdmin);
				alert("Logged in!");
				navigation.navigate("Home");
			} else alert(loginInfo.message);
		});
	}

	function loginAPICall() {
		var postApiURL = "https://nsdev1.xyz/index.php?method=login";

		var Data = {
			email: email,
			password: password,
		};


		var loginInfo = fetch(postApiURL, {
			method: "POST",
			body: JSON.stringify(Data),
		})
			.then((response) => response.json())
			.catch((error) => {
				alert("Error" + error);
			});

		return loginInfo;
	}

	if (!isLoggedIn()) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Natural State Login</Text>
				<TextInput
					placeholder={"Email"}
					style={styles.input}
					onChangeText={(input) => setEmail(input)}
				/>

				<TextInput
					placeholder={"Password"}
					style={styles.input}
					onChangeText={(input) => setPassword(input)}
				/>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.buttonRowContainer}
						onPress={() => {
							login();
						}}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonRowContainer}
						onPress={() => navigation.navigate("SignUp")}
					>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 40,
		marginBottom: 20,
		fontFamily: "Abel_400Regular",
	},
	input: {
		backgroundColor: "#FFFFFF",
		borderRadius: 4,
		height: 50,
		width: "80%",
		marginBottom: 20,
		paddingHorizontal: 20,
		fontSize: 16,
		color: "#4A4A4A",
		borderColor: "#9A7B4F",
		borderWidth: 1,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "80%",
	},
	buttonRowContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		borderColor: "#581613",
		borderWidth: 1,
		width: "40%",
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

export default LoginScreen;
