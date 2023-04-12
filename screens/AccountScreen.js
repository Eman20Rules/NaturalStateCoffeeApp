import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import LoginContext from "../context/LoginContext";

function AccountScreen() {
  const { isLoggedIn, userToken, email, setEmail, password, setPassword } =
    useContext(LoginContext);
  const [userInfo, setUserInfo] = useState([]);
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
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
    var getApiUrl = "https://nsdev1.xyz/index.php?method=getMyUserData";

    setOldEmail(email);
    setOldPassword(password);
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

  function changePassword() {
    if (newPassword == oldPassword) {
      alert("New password is the same as old password!");
      return;
    }
  }

  function changePasswordApiCall() {
    var insertApiUrl = "https://nsdev1.xyz/index.php?method=changePassword";

    var data = {
      new_street: street,
      new_city: city,
      new_state: state,
      new_zip: zipcode,
      new_country: country,
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

  function changeEmail() {
    if (newEmail == oldEmail) {
      alert("New email is the same as old email!");
      return;
    }
  }

  function changeEmailApiCall() {
    var insertApiUrl = "https://nsdev1.xyz/index.php?method=changeAddress";

    var data = {
      new_street: street,
      new_city: city,
      new_state: state,
      new_zip: zipcode,
      new_country: country,
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
      <ScrollView style={styles.scrollView}>
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

        <View style={styles.buttonGroup}>
          <Button
            title={"Edit Email"}
            disabled={
              isEmailEditable || isPasswordEditable || isAddressEditable
            }
            onPress={() => {
              setIsEmailEditable(!isEmailEditable);
            }}
          />
          <Button
            title={"Cancel"}
            color={"#ed1313"}
            disabled={!isEmailEditable}
            onPress={() => {
              setIsEmailEditable(!isEmailEditable);
              setAccountInfo(userInfo);
            }}
          />
          <Button
            title={"Submit Changes"}
            color={"#0bd937"}
            disabled={!isEmailEditable}
            onPress={() => {
              setIsEmailEditable(!isEmailEditable);
              updateAddress();
            }}
          />
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
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subTitle}>Confirm:</Text>
          <TextInput
            style={styles.textInput}
            editable={isPasswordEditable}
            onChangeText={(input) => {
              setConfirmPassword(input);
            }}
          />
        </View>

        <View style={styles.buttonGroup}>
          <Button
            title={"Edit Password"}
            disabled={
              isPasswordEditable || isAddressEditable || isEmailEditable
            }
            onPress={() => {
              setIsPasswordEditable(!isPasswordEditable);
            }}
          />
          <Button
            title={"Cancel"}
            color={"#ed1313"}
            disabled={!isPasswordEditable}
            onPress={() => {
              setIsPasswordEditable(!isPasswordEditable);
              setAccountInfo(userInfo);
            }}
          />
          <Button
            title={"Submit Changes"}
            color={"#0bd937"}
            disabled={!isPasswordEditable}
            onPress={() => {
              setIsPasswordEditable(!isPasswordEditable);
              updateAddress();
            }}
          />
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
          <Button
            style={styles.button}
            title={"Edit Address"}
            disabled={
              isPasswordEditable || isAddressEditable || isEmailEditable
            }
            onPress={() => {
              setIsAddressEditable(!isAddressEditable);
            }}
          />
          <Button
            style={styles.button}
            title={"Cancel"}
            color={"#ed1313"}
            disabled={!isAddressEditable}
            onPress={() => {
              setIsAddressEditable(!isAddressEditable);
              setAccountInfo(userInfo);
            }}
          />
          <Button
            style={styles.button}
            title={"Submit Changes"}
            color={"#0bd937"}
            disabled={!isAddressEditable}
            onPress={() => {
              setIsAddressEditable(!isAddressEditable);
              updateAddress();
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    padding: "10%",
    fontSize: 25,
    fontWeight: "bold",
    color: "#4A4A4A",
    justifyContent: "center",
  },
  subTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4A4A4A",
    paddingLeft: "10%",
    paddingRight: "20%",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    height: 50,
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#4A4A4A",
  },
  scrollView: {
    width: "100%",
    paddingTop: headerPadding,
    paddingBottom: 150,
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
});

export default AccountScreen;
