import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import LoginContext from "../context/LoginContext";

function AccountScreen() {
  const { isLoggedIn, userToken, email, setEmail, password, setPassword } =
    useContext(LoginContext);
  const [userInfo, setUserInfo] = useState([]);
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  function getUserData() {
    var getApiUrl = "https://nsdev1.xyz/index.php?method=getMyUserData";

    fetch(getApiUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.json())
      .then((json) => setAccountInfo(json))
      .catch((error) => {
        alert("Error" + error);
      });
  }

  function setAccountInfo(userInfo) {
    setOldEmail(email);
    setOldPassword(password);
    setNewEmail(email);
    setNewPassword(password);

    if (userInfo.status != 200) {
      alert(userInfo.message);
      return;
    }

    setUserInfo(userInfo);
    setName(userInfo.user.name);
    setStreet(userInfo.user.street);
    setCity(userInfo.user.city);
    setState(userInfo.user.state);
    setCountry(userInfo.user.country);
    setZipcode(userInfo.user.zipcode);
  }

  function updateAddress() {
    updateAddressApiCall.then((updateAddressData) =>
      console.log(updateAddressData)
    );
  }

  function updateAddressApiCall() {
    var insertApiUrl = "https://nsdev1.xyz/index.php?method=changeAddress";

    //validate here if needed, make each required?

    var data = {
      new_street: street,
      new_city: city,
      new_state: state,
      new_zip: zipcode,
      new_country,
      country,
    };

    var updateAddressData = fetch(insertApiUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(data),
    }).then((resp) => resp.json());

    return updateAddressData;
  }

  if (!isLoggedIn()) {
    return (
      <View style={styles.container}>
        <Text>Not Logged In</Text>
      </View>
    );
  } else {
    if (name == "") {
      getUserData();
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login Information:</Text>
        <View style={styles.viewBox}>
          <Text style={styles.title}>Email:</Text>
          <TextInput
            style={styles.view}
            editable={isEditable}
            defaultValue={newEmail}
            onChangeText={(input) => setNewEmail(input)}
          />
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.title}>Password:</Text>
          <TextInput
            style={styles.view}
            editable={isEditable}
            defaultValue={newPassword}
            onChangeText={(input) => setNewPassword(input)}
          />
        </View>
        <Text style={styles.title}>Address Information:</Text>
        <View style={styles.viewBox}>
          <Text style={styles.title}>Name:</Text>
          <TextInput
            style={styles.view}
            editable={isEditable}
            defaultValue={name}
            onChangeText={(input) => setName(input)}
          />
        </View>

        <View style={styles.viewBox}>
          <Text style={styles.title}>Street:</Text>
          <TextInput
            style={styles.view}
            editable={isEditable}
            defaultValue={street}
            onChangeText={(input) => setStreet(input)}
          />
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.title}>City:</Text>
          <TextInput
            style={styles.view}
            editable={isEditable}
            defaultValue={city}
            onChangeText={(input) => setCity(input)}
          />
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.title}>State:</Text>
          <TextInput
            style={styles.view}
            editable={isEditable}
            defaultValue={state}
            onChangeText={(input) => setState(input)}
          />
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.title}>Country:</Text>
          <TextInput
            style={styles.view}
            editable={isEditable}
            defaultValue={country}
            onChangeText={(input) => setCountry(input)}
          />
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.title}>Zipcode:</Text>
          <TextInput
            style={styles.view}
            editable={isEditable}
            defaultValue={zipcode}
            onChangeText={(input) => setZipcode(input)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={"Edit Details"}
            disabled={isEditable}
            onPress={() => {
              setIsEditable(!isEditable);
            }}
          />
          <Button
            title={"Cancel"}
            color={"#ed1313"}
            disabled={!isEditable}
            onPress={() => {
              setIsEditable(false);
              setAccountInfo(userInfo);
            }}
          />
          <Button
            title={"Submit Changes"}
            color={"#0bd937"}
            disabled={!isEditable}
            onPress={() => {
              setIsEditable(!isEditable);
              updateAddress();
            }}
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4A4A4A",
  },
  viewBox: {
    flexDirection: "row",
    // alignItems: "center",
    paddingLeft: "5%",
  },
  view: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    height: 50,
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#4A4A4A",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default AccountScreen;
