import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import CoffeeCarouselBox from "../components/CoffeeCarouselBox";

const isOnAndroid = Platform.OS === "android";
const headerPadding = isOnAndroid ? 74 : 97;

const HomeScreen = () => {
  const [coffeeList, setCoffeeList] = useState([]);

  useEffect(() => {
    getCoffees();
  }, []);

  function getCoffees() {
    var getApiUrl = "http://3.84.255.244/index.php?method=getCoffees";

    fetch(getApiUrl)
      .then((response) => response.json())
      .then((json) => setCoffeeList(json))
      .catch((error) => {
        alert("Error" + error);
      });
  }

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.headerOneStyle}>Subscriptions</Text>
      <View style={styles.listContainerStyle}>
        <FlatList
          data={coffeeList}
          keyExtractor={(item) => item.coffee_id}
          horizontal
          renderItem={({ index, item }) => {
            return (
              <View
                style={[
                  index < coffeeList.length - 1
                    ? { borderRightWidth: 1, borderRightColor: "gray" }
                    : null,
                ]}
              >
                <CoffeeCarouselBox
                  coffee_name={item.coffee_name}
                  coffee_image={item.coffee_image}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

//TODO: I don't know why. I don't want to know why, but the custom header bar does not return any height except 0,
//so using automatic styling doesn't move the content out of the way of the header bar and they end up covering each
//other.  Maybe fix this? For now use paddingTop of 97 on the container View

const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
    paddingTop: headerPadding,
    paddingBottom: 150,
  },
  headerOneStyle: {
    fontSize: 35,
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 8,
  },
  listContainerStyle: {},
  coffeeCarouselBoxStyle: {
    borderStartWidth: 5,
    borderEndWidth: 5,
  },
});

export default HomeScreen;
