import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import AdminNewCoffeeField from "../components/AdminNewCoffeeField";
import LoginContext from "../context/LoginContext";

const AdminEditCoffeeScreen = ({ route, navigation }) => {
  const { userToken } = useContext(LoginContext);
  const [coffeeName, setCoffeeName] = useState(route.params.itemName);
  const [coffeeFlavor, setCoffeeFlavor] = useState(route.params.itemFlavor);
  const [coffeeProcess, setCoffeeProcess] = useState(route.params.itemProcess);
  const [coffeeLikes, setCoffeeLikes] = useState(route.params.itemLike);
  const [coffeeImage, setCoffeeImage] = useState(route.params.imageUrl);
  const [coffeePrice, setCoffeePrice] = useState(route.params.itemPrice);

  const editCoffeeApi = () => {
    const editCoffeeAPIurl = "https://nsdev1.xyz/index.php?method=edit_coffee";

    const data = {
      coffee_id: route.params.itemId,
      coffee_name: coffeeName,
      coffee_flavor: coffeeFlavor,
      process: coffeeProcess,
      coffee_like: coffeeLikes,
      coffee_image: coffeeImage,
      price: coffeePrice,
    };

    const editCoffeeCall = fetch(editCoffeeAPIurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(data),
    }).then((resp) => resp.json());

    return editCoffeeCall;
  };

  const isAllFieldsValid = () => {
    if (!coffeeName) {
      alert("Enter Coffee Name");
      return false;
    }

    if (!coffeeFlavor) {
      alert("Enter Coffee Flavor");
      return false;
    }

    if (!coffeeProcess) {
      alert("Enter Coffee Process");
      return false;
    }

    if (!coffeeLikes) {
      alert("Enter what we like about this coffee");
      return false;
    }

    if (!coffeeImage) {
      alert("Enter coffee image URL");
      return false;
    }

    if (!coffeePrice) {
      alert("Enter coffee price");
      return false;
    }

    if (coffeePrice.at(0) == "$") {
      setCoffeePrice(coffeePrice.slice(1));
    }

    if (!isFinite(+coffeePrice)) {
      alert("Enter a valid price");
      return false;
    }

    return true;
  };

  const submitEditCoffee = () => {
    return new Promise((resolve, reject) => {
      if (!isAllFieldsValid()) {
        reject();
        return;
      }
      editCoffeeApi().then((editCoffeeCall) => {
        if (editCoffeeCall.status == 200 && editCoffeeCall.success == 1) {
          alert("Coffee Edited");
          resolve();
        } else {
          alert(editCoffeeCall.message);
        }
      });
    });
  };

  return (
    <ScrollView style={styles.centeredViewStyle}>
      <View style={styles.container}>
        <Text style={styles.headingOne}>Edit Coffee</Text>
        <View style={styles.coffeeFieldsContainer}>
          <AdminNewCoffeeField
            fieldHeader={"Coffee Name:"}
            fieldChange={setCoffeeName}
            fieldData={coffeeName}
            placeHolder={"Guatemala"}
          />
          <AdminNewCoffeeField
            fieldHeader={"Coffee Flavor:"}
            fieldChange={setCoffeeFlavor}
            fieldData={coffeeFlavor}
            placeHolder={"Rich, Earthy, etc."}
          />
          <AdminNewCoffeeField
            fieldHeader={"Coffee Process:"}
            fieldChange={setCoffeeProcess}
            fieldData={coffeeProcess}
            placeHolder={"Washed 1500ft"}
          />
          <AdminNewCoffeeField
            fieldHeader={"What we like about this coffee:"}
            fieldChange={setCoffeeLikes}
            fieldData={coffeeLikes}
            placeHolder={"A vibrant balanced coffee"}
          />
          <AdminNewCoffeeField
            fieldHeader={"Image URL:"}
            fieldChange={setCoffeeImage}
            fieldData={coffeeImage}
            placeHolder={"https://imageLink.com"}
          />
          <AdminNewCoffeeField
            fieldHeader={"Price:"}
            fieldChange={setCoffeePrice}
            fieldData={coffeePrice}
            placeHolder={"15.00"}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            submitEditCoffee()
              .then((resolve) => navigation.goBack())
              .catch((reject) => {});
          }}
        >
          <Text style={styles.buttonText}>Submit Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  headingOne: {
    fontSize: 35,
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 8,
    fontFamily: "Abel_400Regular",
  },
  coffeeFieldsContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    marginVertical: 5,
    borderColor: "#581613",
    borderWidth: 1,
    width: "100%",
  },
  buttonText: {
    fontSize: 25,
    flex: 1,
    color: "#581613",
    fontFamily: "HankenGrotesk_300Light",
    paddingLeft: 5,
    textAlign: "center",
  },
	centeredViewStyle: {},
	centeredView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		width: "100%",
		height: "100%",
		paddingBottom: 100,
		paddingHorizontal: 20,
	},
	headingOne: {
		fontSize: 35,
		paddingTop: 25,
		paddingBottom: 5,
		paddingHorizontal: 8,
		fontFamily: "Abel_400Regular",
	},
	coffeeFieldsContainer: {
		marginBottom: 10,
	},
	buttonContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 3,
		marginVertical: 5,
		borderColor: "#581613",
		borderWidth: 1,
		width: "100%",
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

export default AdminEditCoffeeScreen;
