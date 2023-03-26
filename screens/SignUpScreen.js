import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

class SignUpScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Username: "",
			Email: "",
			Password: "",
			Street: "",
			City: "",
			State: "",
			Zipcode: "",
		};
	}

	InsertRecord = () => {
		var Username = this.state.Username;
		var Email = this.state.Email;
		var Password = this.state.Password;
		var Street = this.state.Street;
		var City = this.state.City;
		var State = this.state.State;
		var Zipcode = this.state.Zipcode;

		if (
			Username.length == 0 ||
			Email.length == 0 ||
			Password.length == 0 ||
			Street.length == 0 ||
			City.length == 0 ||
			State.length == 0 ||
			Zipcode.length == 0
		) {
			alert("Required Field is Missing");
		} else {
			// var InsertAPIURL = "http://localhost/api/test.php";

			var headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
			};

			var Data = {
				Username: Username,
				Email: Email,
				Password: Password,
				Street: Street,
				City: City,
				State: State,
				Zipcode: Zipcode,
			};

			// fetch(InsertAPIURL, {
			//   method: "POST",
			//   headers: headers,
			//   body: JSON.stringify(Data),
			// })
			//   .then((response) => response.json())
			//   .then((response) => {
			//     alert(response[0].Message);
			//   })
			//   .catch((error) => {
			//     alert("Error" + error);
			//   });
		}
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Coffee Shop Sign Up</Text>
				<TextInput
					placeholder={"Username"}
					placeholderTextColor={"#FF0000"}
					keyboardType={"numeric"}
					style={styles.input}
					onChangeText={(Username) => this.setState({ Username })}
				/>

				<TextInput
					placeholder={"Email"}
					placeholderTextColor={"#FF0000"}
					style={styles.input}
					onChangeText={(Email) => this.setState({ Email })}
				/>

				<TextInput
					placeholder={"Password"}
					placeholderTextColor={"#FF0000"}
					style={styles.input}
					onChangeText={(Password) => this.setState({ Password })}
				/>
				<Text style={styles.title}>Address</Text>
				<TextInput
					placeholder={"Street"}
					placeholderTextColor={"#FF0000"}
					style={styles.input}
					onChangeText={(Street) => this.setState({ Street })}
				/>

				<TextInput
					placeholder={"City"}
					placeholderTextColor={"#FF0000"}
					style={styles.input}
					onChangeText={(City) => this.setState({ City })}
				/>

				<TextInput
					placeholder={"State"}
					placeholderTextColor={"#FF0000"}
					style={styles.input}
					onChangeText={(State) => this.setState({ State })}
				/>

				<TextInput
					placeholder={"Zipcode"}
					placeholderTextColor={"#FF0000"}
					style={styles.input}
					onChangeText={(Zipcode) => this.setState({ Zipcode })}
				/>

				<View style={styles.buttonContainer}>
					<Button title={"Sign Up"} onPress={this.InsertRecord} />
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
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#4A4A4A",
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
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "80%",
	},
});

export default SignUpScreen;
