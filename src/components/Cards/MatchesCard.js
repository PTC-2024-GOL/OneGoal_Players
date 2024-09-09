import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import {Card} from "react-native-paper";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MatchesCard = ({data, goToScreen, teamImg, rivalImg}) => {

     console.log('data' + data)
    return (
        <Card mode={"elevated"} style={styles.card} onPress={() => goToScreen(data)}>
            <Text style={styles.title}>{data.nombre_equipo} vs. {data.nombre_rival}</Text>
            <View style={styles.row}>
                <Image style={styles.img} source={{uri: teamImg}}/>
                <View style={styles.col}>
                    <Text style={styles.dateTitle}>Fecha</Text>
                    <Text style={styles.dateText}>{data.fecha}</Text>
                </View>
                <Image style={styles.img} source={{uri: rivalImg}}/>
            </View>
        </Card>
    );
};

export default MatchesCard;

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginBottom: 25,
        backgroundColor: '#fff'
    },
    title: {
      textAlign: "center",
      fontFamily: 'Poppins_700Bold',
      backgroundColor: '#def7f8',
      padding: 4,
      marginBottom: 10,
      borderRadius: 12
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center"
    },
    col: {
        flexDirection: "column",
        alignItems: "center"
    },
    img: {
        borderRadius: 100,
        width: 50,
        height: 50
    },
    dateTitle: {
        fontFamily: 'Poppins_600SemiBold'
    },
    dateText: {
        fontFamily: 'Poppins_400Regular',
        width: 120,
        textAlign: "center",
        fontSize: 12
    }
});
