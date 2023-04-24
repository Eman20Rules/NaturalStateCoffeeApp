import React, { useContext, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	ScrollView,
	Platform,
	TouchableOpacity,
} from "react-native";
import LoginContext from "../context/LoginContext";

function AccountScreen() {
	const { isLoggedIn, userToken, email, setEmail, password, setPassword } =
		useContext(LoginContext);

	const [hasFetched, setHasFetched] = useState(false);
	const [userInfo, setUserInfo] = useState([]);
	const [newEmail, setNewEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [isAddressEditable, setIsAddressEditable] = useState(false);
	const [isEmailEditable, setIsEmailEditable] = useState(false);
	const [isPasswordEditable, setIsPasswordEditable] = useState(false);

	function getUserData() {
		setHasFetched(true);

		var getApiUrl = "https://nsdev1.xyz/index.php?method=getMyUserData";

		setNewEmail(email);
		setNewPassword(password);

		fetch(getApiUrl, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + userToken,
			},
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.status != 200) {
					alert(json.message);
					return;
				}
				setAccountInfo(json);
			})
			.catch((error) => {
				alert("Error" + error);
			});
	}

	function setAccountInfo(userData) {
		setUserInfo(userData);
		setName(userData.user.name);
		setStreet(userData.user.street);
		setCity(userData.user.city);
		setState(userData.user.state);
		setCountry(userData.user.country);
		setZipcode(userData.user.zipcode);
	}

	function updateAddress() {
		if (!isEditAddressRequestValid()) {
			return;
		}

		updateAddressApiCall().then((updateAddressData) => {
			if (updateAddressData.status == 200) {
				alert("Address has been updated!");
				getUserData();
			} else alert("Error: " + updateAddressData.message);
		});
	}

	function updateAddressApiCall() {
		var insertApiUrl = "https://nsdev1.xyz/index.php?method=changeAddress";

		var data = {
			new_street: street,
			new_city: city,
			new_state: state,
			new_zip: zipcode,
			new_country: country,
		};

		var updateAddressInfo = fetch(insertApiUrl, {
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

		return updateAddressInfo;
	}

	function isEditAddressRequestValid() {
		if (street == "") {
			alert("Street is required");
			return false;
		}

		if (city == "") {
			alert("City is required");
			return false;
		}

		if (state == "") {
			alert("State is required");
			return false;
		} else if (state.length > 2) {
			alert("State must be 2 characters");
			return false;
		}

		if (zipcode == "") {
			alert("Zipcode is required");
			return false;
		}

		if (country == "") {
			alert("Country is required");
			return false;
		}

		return true;
	}

	function updatePassword() {
		if (!isUpdatePasswordRequestValid()) {
			setNewPassword(password);
			setConfirmPassword("");
			return;
		}

		updatePasswordApiCall().then((updatePasswordCall) => {
			if (updatePasswordCall.success == 0) {
				alert("Error: " + updatePasswordCall.message);
			}

			alert("Success: Password was updated!");
			setPassword(newPassword);
			setConfirmPassword("");
		});
	}

	function isUpdatePasswordRequestValid() {
		if (newPassword == password) {
			alert("New password is the same as old password!");
			return false;
		}

		if (newPassword.length < 8) {
			alert("Password Must be at least 8 characters long!");
			return false;
		}

		if (newPassword != confirmPassword) {
			alert("New password and confirm password don't match!");
			return false;
		}

		return true;
	}

	function updatePasswordApiCall() {
		var insertApiUrl = "https://nsdev1.xyz/index.php?method=changePassword";

		var data = {
			current_password: password,
			new_password: newPassword,
			confirm_password: confirmPassword,
		};

		var changePasswordInfo = fetch(insertApiUrl, {
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
		return changePasswordInfo;
	}

	function updateEmail() {
		if (!isUpdateEmailRequestValid()) {
			setNewEmail(email);
			setConfirmEmail("");
			return;
		}

		updateEmailApiCall().then((updateEmailCall) => {
			if (updateEmailCall.status != 200) {
				alert("Error: " + updateEmailCall.message);
			}

			alert("Success: Email was updated!");
			setEmail(newEmail);
			setConfirmEmail("");
		});
	}

	function isUpdateEmailRequestValid() {
		if (newEmail == email) {
			alert("New email is the same as old email!");
			return false;
		}

		if (newEmail != confirmEmail) {
			alert("New email and confirm email don't match!");
			return false;
		}

		return true;
	}

	function updateEmailApiCall() {
		var insertApiUrl = "https://nsdev1.xyz/index.php?method=changeEmail";

		var data = {
			new_email: newEmail,
			confirm_email: confirmEmail,
		};

		var updateEmailInfo = fetch(insertApiUrl, {
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

		return updateEmailInfo;
	}

	if (!isLoggedIn()) {
		return (
			// <ScrollView style={styles.scrollView}>
			<View style={styles.containerTop}>
				<Text style={styles.subTitle}>Not Logged In</Text>
			</View>
			// </ScrollView>
		);
	} else {
		if (!hasFetched) {
			getUserData();
		}

		return (
			<ScrollView>
				<View style={styles.scrollView}>
					<Text style={styles.title}>Login Information:</Text>

					<View style={styles.container}>
						<Text style={styles.subTitle}>Email:</Text>
						<TextInput
							style={styles.textInput}
							editable={isEmailEditable}
							defaultValue={newEmail}
							onChangeText={(input) => {
								setNewEmail(input);
							}}
						/>
					</View>

					<View style={styles.container}>
						<Text style={styles.subTitle}>Confirm:</Text>
						<TextInput
							style={styles.textInput}
							editable={isEmailEditable}
							defaultValue={confirmEmail}
							onChangeText={(input) => {
								setConfirmEmail(input);
							}}
						/>
					</View>

					<View style={styles.buttonGroup}>
						<TouchableOpacity
							style={
								isEmailEditable || isPasswordEditable || isAddressEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsEmailEditable(!isEmailEditable);
							}}
							disabled={
								isEmailEditable || isPasswordEditable || isAddressEditable
							}
						>
							<Text
								style={
									isEmailEditable || isPasswordEditable || isAddressEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Edit Email
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={
								!isEmailEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsEmailEditable(!isEmailEditable);
								setNewEmail(email);
							}}
							disabled={!isEmailEditable}
						>
							<Text
								style={
									!isEmailEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={
								!isEmailEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsEmailEditable(!isEmailEditable);
								updateEmail();
							}}
							disabled={!isEmailEditable}
						>
							<Text
								style={
									!isEmailEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Submit Changes
							</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.container}>
						<Text style={styles.subTitle}>Password:</Text>
						<TextInput
							style={styles.textInput}
							editable={isPasswordEditable}
							defaultValue={newPassword}
							onChangeText={(input) => {
								setNewPassword(input);
							}}
							secureTextEntry={!isPasswordEditable}
						/>
					</View>

					<View style={styles.container}>
						<Text style={styles.subTitle}>Confirm:</Text>
						<TextInput
							style={styles.textInput}
							editable={isPasswordEditable}
							defaultValue={confirmPassword}
							onChangeText={(input) => {
								setConfirmPassword(input);
							}}
						/>
					</View>

					<View style={styles.buttonGroup}>
						<TouchableOpacity
							style={
								isEmailEditable || isPasswordEditable || isAddressEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsPasswordEditable(!isPasswordEditable);
							}}
							disabled={
								isEmailEditable || isPasswordEditable || isAddressEditable
							}
						>
							<Text
								style={
									isEmailEditable || isPasswordEditable || isAddressEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Edit Password
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={
								!isPasswordEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsPasswordEditable(!isPasswordEditable);
								setConfirmPassword("");
								setNewPassword(password);
							}}
							disabled={!isPasswordEditable}
						>
							<Text
								style={
									!isPasswordEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={
								!isPasswordEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsPasswordEditable(!isPasswordEditable);
								updatePassword();
							}}
							disabled={!isPasswordEditable}
						>
							<Text
								style={
									!isPasswordEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Submit Changes
							</Text>
						</TouchableOpacity>
					</View>

					<Text style={styles.title}>Address Information:</Text>

					<View style={styles.container}>
						<Text style={styles.subTitle}>Name:</Text>
						<TextInput
							style={styles.textInput}
							editable={isAddressEditable}
							defaultValue={name}
							onChangeText={(input) => {
								setName(input);
							}}
						/>
					</View>

					<View style={styles.container}>
						<Text style={styles.subTitle}>Street:</Text>
						<TextInput
							style={styles.textInput}
							editable={isAddressEditable}
							defaultValue={street}
							onChangeText={(input) => {
								setStreet(input);
							}}
						/>
					</View>

					<View style={styles.container}>
						<Text style={styles.subTitle}>City:</Text>
						<TextInput
							style={styles.textInput}
							editable={isAddressEditable}
							defaultValue={city}
							onChangeText={(input) => {
								setCity(input);
							}}
						/>
					</View>

					<View style={styles.container}>
						<Text style={styles.subTitle}>Zipcode:</Text>
						<TextInput
							style={styles.textInput}
							editable={isAddressEditable}
							defaultValue={zipcode}
							onChangeText={(input) => {
								setZipcode(input);
							}}
						/>
					</View>

					<View style={styles.container}>
						<Text style={styles.subTitle}>State:</Text>
						<TextInput
							style={styles.textInput}
							editable={isAddressEditable}
							defaultValue={state}
							onChangeText={(input) => {
								setState(input);
							}}
						/>
					</View>

					<View style={styles.container}>
						<Text style={styles.subTitle}>Country:</Text>
						<TextInput
							style={styles.textInput}
							editable={isAddressEditable}
							defaultValue={country}
							onChangeText={(input) => {
								setCountry(input);
							}}
						/>
					</View>

					<View style={styles.buttomButtons}>
						<TouchableOpacity
							style={
								isEmailEditable || isPasswordEditable || isAddressEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsAddressEditable(!isAddressEditable);
							}}
							disabled={
								isEmailEditable || isPasswordEditable || isAddressEditable
							}
						>
							<Text
								style={
									isEmailEditable || isPasswordEditable || isAddressEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Edit Address
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={
								!isAddressEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsAddressEditable(!isAddressEditable);
								setAccountInfo(userInfo);
							}}
							disabled={!isAddressEditable}
						>
							<Text
								style={
									!isAddressEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={
								!isAddressEditable
									? [
											styles.buttonRowContainer,
											styles.disabledButtonRowContainer,
									  ]
									: styles.buttonRowContainer
							}
							onPress={() => {
								setIsAddressEditable(!isAddressEditable);
								updateAddress();
							}}
							disabled={!isAddressEditable}
						>
							<Text
								style={
									!isAddressEditable
										? [styles.buttonText, styles.disabledButtonText]
										: styles.buttonText
								}
							>
								Submit Changes
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F5F5F5",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	containerTop: {
		backgroundColor: "#F5F5F5",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		height: 400,
	},
	title: {
		padding: "10%",
		fontSize: 35,
		fontFamily: "Abel_400Regular",
		justifyContent: "center",
	},
	subTitle: {
		fontSize: 25,
		fontFamily: "HankenGrotesk_300Light",
		marginBottom: 20,
		flex: 0.4,
	},
	textInput: {
		backgroundColor: "#FFFFFF",
		borderRadius: 4,
		height: 50,
		width: 200,
		marginBottom: 20,
		paddingHorizontal: 20,
		fontSize: 20,
		color: "#4A4A4A",
		flex: 0.6,
		borderColor: "#581613",
		borderWidth: 1,
	},
	scrollView: {
		width: "100%",
		paddingTop: 0,
		paddingHorizontal: 20,
	},
	buttonGroup: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		paddingBottom: "10%",
	},
	buttomButtons: {
		paddingBottom: "20%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	buttonRowContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		marginHorizontal: 5,
		borderColor: "#581613",
		borderWidth: 1,
		width: "25%",
		height: 60,
	},
	buttonText: {
		fontSize: 18,
		flex: 1,
		color: "#581613",
		fontFamily: "HankenGrotesk_300Light",

		textAlign: "center",
	},
	disabledButtonRowContainer: {
		borderColor: "#bababa",
		backgroundColor: "#bababa",
	},
	disabledButtonText: {
		color: "#616161",
	},
});

export default AccountScreen;
