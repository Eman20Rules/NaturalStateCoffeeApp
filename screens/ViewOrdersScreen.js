import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class ViewOrdersScreen extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>View Orders Screen</Text>
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

export default ViewOrdersScreen;
