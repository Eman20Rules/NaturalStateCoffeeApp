import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";

const PopupModal = ({ modalChildren, modalVisible, setModalVisible }) => {
	return (
		<Modal
			transparent={true}
			visible={modalVisible}
			animationType="fade"
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<View
				style={[
					styles.centeredViewStyle,
					{ backgroundColor: "rgba(0,0,0,0.5)" },
				]}
			>
				<View style={styles.popUpStyle}>{modalChildren}</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredViewStyle: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	popUpStyle: {
		backgroundColor: "white",
		borderRadius: 5,
		padding: 20,
		marginHorizontal: 10,
	},
});

export default PopupModal;
