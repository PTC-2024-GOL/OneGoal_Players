import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Fonts from "../../fonts/fonts";
const windowWidth = Dimensions.get('window').width;

const CustomTabLabel = ({ text }) => {
    Fonts();
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
        fontFamily: 'Poppins_400Regular',
        fontSize: 9,
        textAlign: 'center',
        color: 'white',
    },
});

export default CustomTabLabel;
