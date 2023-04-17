import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const AdminNewCoffeeField = ({
	fieldHeader,
	fieldChange,
	fieldData,
	placeHolder,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.fieldHeader}>{fieldHeader}</Text>
			<View style={styles.textInputContainer}>
				<TextInput
					style={styles.textInput}
					onChangeText={fieldChange}
					value={fieldData}
					placeholder={placeHolder}
					placeHolderTextColor="#9A7B4F"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 5,
		height: 100,
	},
	fieldHeader: {
		textAlignVertical: "center",
		flex: 0.25,
		fontFamily: "HankenGrotesk_600SemiBold",
		marginRight: 5,
		fontSize: 20,
	},
	textInputContainer: {
		borderWidth: 1,
		borderColor: "#9A7B4F",
		borderRadius: 5,
		paddingHorizontal: 5,
		flex: 0.75,
		justifyContent: "center",
	},
	textInput: { fontSize: 15 },
});

export default AdminNewCoffeeField;
