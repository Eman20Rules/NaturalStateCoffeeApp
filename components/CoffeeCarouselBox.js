import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";

let carouselHeight = 450;

class CoffeeCarouselBox extends Component {
  render() {
    return (
      <View style={styles.theBox}>
        <View style={{ flex: 2 }}>
          <Image
            source={this.props.coffee.coffee_image}
            style={styles.coffeeCarouselImage}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.coffeeCarouselText}>{this.props.coffee.coffee_name}</Text>
        </View>
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
  },
  theBox: {
    height: carouselHeight,
    width: carouselHeight - 200,
    marginLeft: 30,
    borderWidth: 5,
    borderColor: "#8a630a",
    backgroundColor: "#cca241",
  },
  coffeeCarouselImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  coffeeCarouselText: {
    textAlign: "center",
    fontSize: 35,
    color: "white",
  },
});

export default CoffeeCarouselBox;
