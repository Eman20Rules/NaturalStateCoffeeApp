import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import CoffeeCarouselBox from "../components/CoffeeCarouselBox";

let carouselHeight = 500;
let isOnMobile =
  Platform.OS == "ios" || Platform.OS == "android" ? false : true;

class HomeScreen extends Component {
  render() {
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
              <CoffeeCarouselBox
                imageUri={require("../images/Brazil.jpg")}
                name="Brazil"
              />
              <CoffeeCarouselBox
                imageUri={require("../images/Columbia_Wush_Wush.jpg")}
                name="Columbia Wush Wush"
              />
              <CoffeeCarouselBox
                imageUri={require("../images/Guatemala.jpg")}
                name="Guatemala"
              />
              <CoffeeCarouselBox
                imageUri={require("../images/Mexico.jpg")}
                name="Mexico"
              />
              <CoffeeCarouselBox
                imageUri={require("../images/Ozark_Moon_Espresso_Roast.jpg")}
                name="Ozark Moon Espresso Roast"
              />
              <CoffeeCarouselBox
                imageUri={require("../images/Panama_Carmen_Estate.jpg")}
                name="Panama Carmen Estate"
              />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
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
