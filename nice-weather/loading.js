import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function Loading() {
	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content"></StatusBar>
			<Text style={styles.text}>날씨 정보를</Text>
			<Text style={styles.text}>가져오는 중이에요 :)</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 30,
		paddingVertical: 100,
		backgroundColor: '#cfffe5',
	},
	text: {
		color: 'black',
		fontSize: 30,
		paddingHorizontal: 55,
	},
});
