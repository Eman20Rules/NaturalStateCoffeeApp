import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");

  // useEffect(() => {
  //   navigation.setOptions({
  //     userTokenG: userToken === '' ? 'No Token' : userToken,
  //   });
  // }, [navigation, userToken]);

  // const { handleLoggedIn } = route.params;

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
        localStorage.setItem("token", loginInfo.token);
        setUserToken(loginInfo.token);
        if (loginInfo.is_admin == 1) {
          localStorage.setItem("isAdmin", true);
        }
      } else alert(loginInfo.message);
    });
  }

  function loginAPICall() {
    var postApiURL = "http://3.84.255.244/index.php?method=login";

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

  if (localStorage.getItem("token") == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Coffee Shop Login</Text>
        <TextInput
          placeholder={"Email"}
          placeholderTextColor={"#FF0000"}
          style={styles.input}
          onChangeText={(input) => setEmail(input)}
        />

        <TextInput
          placeholder={"Password"}
          placeholderTextColor={"#FF0000"}
          style={styles.input}
          onChangeText={(input) => setPassword(input)}
        />

        <View style={styles.buttonContainer}>
          <Button title={"Login"} onPress={login} />
          <Button
            title={"Sign Up"}
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
    );
  }

  if (localStorage.getItem("token") != null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Logged In!</Text>
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
