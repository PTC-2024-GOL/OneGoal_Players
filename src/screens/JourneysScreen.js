import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import fetchData from '../../api/components';
import LoadingComponent from "../components/LoadingComponent";
import JourneyCard from '../components/Cards/JourneyCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import soccer from '../../assets/Player-soccer.png';

const JourneysScreen = ({ logueado, setLogueado }) => {

    const [refreshing, setRefreshing] = useState(false);

    // Datos de ejemplo para las jornadas
    const journeys = [
        { id: 1, title: "Jornada VII", duration: "De abril 2024 - octubre 2024" },
        { id: 2, title: "Jornada VI", duration: "De octubre 2023 - marzo 2024" },
        { id: 3, title: "Jornada V", duration: "De abril 2023 - septiembre 2023" },
        { id: 4, title: "Jornada IV", duration: "De octubre 2022 - marzo 2023" },
    ];

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // Aquí iría la lógica para refrescar los datos
        setRefreshing(false);
    }, []);

    const handleTrainingPress = (id) => {
        // Manejar la lógica para la acción de entrenamientos
        console.log(`Entrenamientos de la Jornada ${id}`);
    };

    const handleRatingsPress = (id) => {
        // Manejar la lógica para la acción de calificaciones
        console.log(`Calificaciones de la Jornada ${id}`);
    };
    // URL de la API para el usuario
    const API = 'services/players/jornadas.php';

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" colors={['white', 'white', 'white']}
                progressBackgroundColor="#020887" />
            }>
            <Text style={styles.headerText}>Mira tus jornadas</Text>
            <View style={styles.infoRowTree}>
                <Ionicons name="football" size={35} color="black" />
                <Text style={styles.subHeaderText}>
                    Selecciona una jornada y ve tus notas, entrenamientos, observaciones y más.
                </Text>
            </View>
            <View style={styles.infoRowFour}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Jornadas</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {journeys.map((journey) => (
                        <JourneyCard
                            key={journey.id}
                            journey={journey}
                            onPressTraining={handleTrainingPress}
                            onPressRatings={handleRatingsPress}
                        />
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    )
}

export default JourneysScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: windowHeight * 0.13,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subHeaderText: {
        fontSize: 16,
        marginBottom: 16,
        marginStart: 10,
        maxWidth: windowWidth,
    },
    button: {
        backgroundColor: '#334195', // Green color
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        maxWidth: windowWidth * 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'italic',
    },
    scrollContainer: {
        flex: 1,
        paddingBottom: 15,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    time: {
        fontSize: 14,
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoRowTwo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoRowTree: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 6,
    },
    infoRowFour: {
        alignItems: 'center',
        margin: 6,
    },
    linkText: {
        color: '#000000',
        textDecorationLine: 'underline',
        marginHorizontal: 5,
        maxWidth: 125
    },
    iconButton: {
        backgroundColor: '#5AE107',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    playersCount: {
        backgroundColor: '#000',
        borderRadius: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    playersCountText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }, tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#473698',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    tableHeaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    journeyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    journeyDuration: {
        fontSize: 14,
        color: '#777',
        marginVertical: 5,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#5AE107',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    actionButtonPurple: {
        backgroundColor: '#8A2BE2',
    },
    actionText: {
        color: '#000',
        fontSize: 12,
        marginHorizontal: 5,
        maxWidth: 85,
        textAlign: 'center',
    },
})