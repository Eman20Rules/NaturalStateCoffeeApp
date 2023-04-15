import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import LoginContext from "../context/LoginContext";

function SignUpScreen() {
  const {
    isLoggedIn,
    setSecurityInfo,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(LoginContext);

  const [fName, setFName] = useState("");
  const [mName, setMName] = useState("");
  const [lName, setLName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  function SignUp() {
    if (isInputValid()) {
      SignUpAPICall().then((signUpCall) => {
        if (signUpCall.status == 201) {
          setSecurityInfo(signUpCall.token, false);
        } else {
          alert(signUpCall.message);
        }
      });
    }
  }

  function SignUpAPICall() {
    var insertApiUrl = "https://nsdev1.xyz/index.php?method=register";

    if (mName == "") {
      var userName = fName + ", " + lName;
    } else {
      var userName = fName + ", " + mName + ", " + lName;
    }

    var data = {
      name: userName,
      email: email,
      password: password,
      street: street,
      city: city,
      state: state,
      country: country,
      zipcode: zip,
    };

    var signUpData = fetch(insertApiUrl, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((resp) => resp.json());

    return signUpData;
  }

  function isInputValid() {
    if (email.length == 0) {
      alert("Email is Required");
      return false;
    }

    if (password.length == 0) {
      alert("Password is Required");
      return false;
    } else if (password.length < 8) {
      alert("Password must be 8 characters or longer");
      return false;
    }

    if (fName.length == 0) {
      alert("First Name is Required");
      return false;
    }

    if (lName.length == 0) {
      alert("Last Name is Required");
      return false;
    }

    if (street.length == 0) {
      alert("Street is Required");
      return false;
    }

    if (city.length == 0) {
      alert("City is Required");
      return false;
    }

    if (state.length == 0) {
      alert("State is Required");
      return false;
    }

    if (country.length == 0) {
      alert("Country is Required");
      return false;
    }

    if (zip.length == 0) {
      alert("ZIP is Required");
      return false;
    }

    return true;
  }

  if (!isLoggedIn()) {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Coffee Shop Sign Up</Text>

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

          <Text style={styles.title}>Name</Text>

          <TextInput
            placeholder={"First Name"}
            placeholderTextColor={"#FF0000"}
            style={styles.input}
            onChangeText={(input) => setFName(input)}
          />

          <TextInput
            placeholder={"Middle Name"}
            placeholderTextColor={"#4A4A4A"}
            style={styles.input}
            onChangeText={(input) => setMName(input)}
          />

          <TextInput
            placeholder={"Last Name"}
            placeholderTextColor={"#FF0000"}
            style={styles.input}
            onChangeText={(input) => setLName(input)}
          />

          <Text style={styles.title}>Address</Text>

          <TextInput
            placeholder={"Street"}
            placeholderTextColor={"#FF0000"}
            style={styles.input}
            onChangeText={(input) => setStreet(input)}
          />

          <TextInput
            placeholder={"City"}
            placeholderTextColor={"#FF0000"}
            style={styles.input}
            onChangeText={(input) => setCity(input)}
          />

          <TextInput
            placeholder={"State"}
            placeholderTextColor={"#FF0000"}
            style={styles.input}
            onChangeText={(input) => setState(input)}
          />

          <TextInput
            placeholder={"Country"}
            placeholderTextColor={"#FF0000"}
            style={styles.input}
            onChangeText={(input) => setCountry(input)}
          />

          <TextInput
            placeholder={"ZIP Code"}
            placeholderTextColor={"#FF0000"}
            style={styles.input}
            onChangeText={(input) => setZip(input)}
          />

          <View style={styles.buttonContainer}>
            <Button title={"Sign Up"} onPress={SignUp} />
          </View>
        </View>
      </ScrollView>
    );
  }

  if (isLoggedIn()) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Signed Up!</Text>
      </View>
    );
  }
}

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

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
    // paddingTop: "10%",
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
  scrollView: {
    width: "100%",
    paddingTop: headerPadding,
    paddingBottom: 150,
  },
});

export default SignUpScreen;
