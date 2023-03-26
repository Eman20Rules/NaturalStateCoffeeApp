import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  InsertRecord = () => {
    var username = this.state.username;
    var password = this.state.password;

    if (username.length == 0 || password.length == 0) {
      alert("Required Field is Missing");
    } else {
      var postApiURL = "http://3.84.255.244/index.php?method=login";

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        username: username,
        password: password,
      };

      fetch(InsertAPIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response[0].Message);
        })
        .catch((error) => {
          alert("Error" + error);
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Coffee Shop Login</Text>
        <TextInput
          placeholder={"Username"}
          placeholderTextColor={"#FF0000"}
          keyboardType={"numeric"}
          style={styles.input}
          onChangeText={(username) => this.setState({ username })}
        />

        <TextInput
          placeholder={"Password"}
          placeholderTextColor={"#FF0000"}
          style={styles.input}
          onChangeText={(password) => this.setState({ password })}
        />

        <View style={styles.buttonContainer}>
          <Button title={"Login"} onPress={this.InsertRecord} />
          <Button
            title={"Sign Up"}
            onPress={() => this.props.navigation.navigate("SignUp")}
          />
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

export default LoginScreen;
