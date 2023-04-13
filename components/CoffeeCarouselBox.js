import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const imageHeight = 200;
const imageWidth = 150;

const CoffeeCarouselBox = ({ coffee, setInfoPopup, setInfoVisible }) => {
  const styles = StyleSheet.create({
    containerStyle: {
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    imageStyle: {
      resizeMode: "cover",
      height: imageHeight,
      width: imageWidth,
    },
    textStyle: {
      fontSize: 25,
      width: 150,
      textAlign: "center",
      textAlignVertical: "auto",
      fontFamily: "Abel_400Regular",
    },
    textContainerStyle: {
      justifyContent: "center",
      height: 80,
      marginBottom: 10,
    },
    buttonContainerStyle: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      padding: 3,
      marginVertical: 5,
      borderColor: "#581613",
      borderWidth: 1,
      width: "100%",
    },
    subscriptionButtonStyle: {
      fontSize: 17,
      flex: 1,
      color: "#581613",
      fontFamily: "HankenGrotesk_300Light",
      paddingLeft: 5,
      textAlign: "center",
    },
    modalStyle: {
      position: "absolute",
      left: "50%",
      right: "50%",
    },
    modalViewStyle: {
      height: "100%",
    },
    infoTitleStyle: {
      fontSize: 25,
      textAlign: "center",
      fontFamily: "Abel_400Regular",
    },
    infoHeaderStyle: {
      fontFamily: "HankenGrotesk_600SemiBold",
      textAlign: "center",
    },
    infoBodyStyle: {
      fontFamily: "Abel_400Regular",
      textAlign: "center",
    },
    hairlineDividerStyle: {
      borderBottomWidth: StyleSheet.hairlineWidth * 5,
      marginHorizontal: 2,
      marginVertical: 5,
      borderColor: "#9A7B4F",
    },
    infoGroupingStyle: {
      padding: 4,
    },
  });

  const coffeeInfo = (
    <View>
      <Text style={styles.infoTitleStyle}>{coffee.coffee_name}</Text>
      <View style={styles.hairlineDividerStyle} />
      <View style={styles.infoGroupingStyle}>
        <Text style={styles.infoHeaderStyle}>Flavor Notes:</Text>
        <Text style={styles.infoBodyStyle}>{coffee.coffee_flavor}</Text>
      </View>
      <View style={styles.infoGroupingStyle}>
        <Text style={styles.infoHeaderStyle}>Process:</Text>
        <Text style={styles.infoBodyStyle}>{coffee.process}</Text>
      </View>
      <View style={styles.infoGroupingStyle}>
        <Text style={styles.infoHeaderStyle}>
          What we like about this coffee:
        </Text>
        <Text style={styles.infoBodyStyle}>{coffee.coffee_like}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.containerStyle}>
      <View style={styles.imageContainerStyle}>
        <Image
          source={{ uri: coffee.coffee_image }}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>{coffee.coffee_name}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainerStyle}
        onPress={() => {
          setInfoPopup(coffeeInfo);
          setInfoVisible(true);
        }}
      >
        <Feather
          name="info"
          size={24}
          color="#581613"
          style={{ position: "absolute", left: 2 }}
        />
        <Text style={styles.subscriptionButtonStyle}>Info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainerStyle}>
        <Feather
          name="shopping-cart"
          size={24}
          color="#581613"
          style={{ position: "absolute", left: 2 }}
        />
        <Text style={styles.subscriptionButtonStyle}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CoffeeCarouselBox;
