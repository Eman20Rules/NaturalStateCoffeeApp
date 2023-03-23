import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import CoffeeCarouselBox from "../components/CoffeeCarouselBox";

let carouselHeight = 500;
let isOnMobile =
  Platform.OS == "ios" || Platform.OS == "android" ? false : true;

function HomeScreen() {
  const [coffeeList, setCoffeeList] = useState([]);

  useEffect(() => {
    getCoffees();
  }, []);

  async function getCoffees() {
    var getApiUrl = "http://3.84.255.244/index.php?method=getCoffee";

    fetch(getApiUrl)
      .then((response) => response.json())
      .then((json) => setCoffeeList(json))
      .catch((error) => {
        alert("Error" + error);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView scrollEventThrottle={16} style={{ width: "100%" }}>
        <View>
          <Text style={styles.storeTitle}>Coffee Selections!</Text>
        </View>
        <View style={styles.coffeeSelectionsCarousel}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={isOnMobile}
          >
            {coffeeList && <CoffeeView coffees={coffeeList} />}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

function CoffeeView({ coffees }) {
  return (
    <div>
      <>
        {coffees.map((coffeeItem) => (
          <CoffeeCarouselBox key={coffeeItem} coffee={coffeeItem} />
        ))}
      </>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  storeTitle: {
    fontSize: 40,
    fontWeight: "heavy",
    paddingHorizontal: 20,
    backgroundColor: "#34c97a",
    color: "white",
    marginBottom: 10,
  },
  coffeeSelectionsCarousel: {
    height: carouselHeight,
  },
});

export default HomeScreen;
