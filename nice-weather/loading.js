import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {
    return <View style={styles.container}>
        <Text style={styles.text}>Getting the nice weather</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: '#3EB489'
    },
    text: {
        color: '#2C2C2C',
        fontSize: 30
    }
});