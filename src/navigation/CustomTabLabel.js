import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const CustomTabLabel = ({ text }) => {
    return (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    labelContainer: {
        maxWidth: windowWidth * 0.2,  // Ajusta el ancho máximo según sea necesario
    },
    labelText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
    },
});

export default CustomTabLabel;
