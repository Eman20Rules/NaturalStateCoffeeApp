import React from "react";
import { View, StyleSheet } from "react-native";

const HairlineDivider = ({ marginVertical, marginHorizontal }) => {
	const styles = StyleSheet.create({
		hairlineDividerStyle: {
			borderBottomWidth: StyleSheet.hairlineWidth * 5,
			marginHorizontal: marginHorizontal,
			marginVertical: marginVertical,
			borderColor: "#9A7B4F",
		},
	});
	return <View style={styles.hairlineDividerStyle} />;
};

export default HairlineDivider;
