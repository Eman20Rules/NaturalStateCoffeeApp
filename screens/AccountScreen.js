import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}

function AccountScreen() {
  const forceUpdate = useForceUpdate();

  if (localStorage.getItem("token") != null) {
    return (
      <View style={style.container}>
        <Text>Not Logged in</Text>
      </View>
    );
  }

  if (localStorage.getItem("token") == null) {
    return (
      <View style={style.container}>
        <Text>Logged in</Text>
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

export default AccountScreen;
