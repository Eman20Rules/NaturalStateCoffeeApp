import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class CartScreen extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>Cart Screen</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartScreen;
