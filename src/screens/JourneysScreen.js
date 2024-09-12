import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import fetchData from '../../api/components';
import LoadingComponent from "../components/LoadingComponent";
import JourneyCard from '../components/Cards/JourneyCard';
import { Searchbar } from 'react-native-paper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const JourneysScreen = ({ logueado, setLogueado }) => {

    // URL de la API para el usuario
    const API = 'services/players/jornadas.php';
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco
    const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial
    const [response, setResponse] = useState(false); // Estado para controlar si hay datos
    const [searchQuery, setSearchQuery] = useState("");
    //Constantes para la busqueda con el elemento de la libreria searchBar
    const onChangeSearch = (query) => setSearchQuery(query);

    const [journeys, setJourneys] = useState([]);
    const navigation = useNavigation();

    const fillCards = async (searchForm = null) => {
        try {
            const action = searchForm ? "searchRows" : "readAllMobile";
            const DATA = await fetchData(API, action, searchForm);

            if (DATA.status) {
                let data = DATA.dataset;
                const updatedJourneys = data.map(item => ({
                    id: item.ID,
                    title: `${item.NOMBRE} - ${item.TEMPORADA}`,
                    duration: `Del ${item.FECHA_INICIO} al ${item.FECHA_FIN}`
                }));
                setJourneys(updatedJourneys);
                setResponse(true);
            } else {
                console.log(DATA.error);
                setJourneys([]);
                setResponse(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fillCards();
    }, []);

    useEffect(() => {
        fillCards();
    }, []);

    useEffect(() => {
        if (searchQuery != "") {
            const formData = new FormData();
            formData.append("search", searchQuery);
            fillCards(formData);
        } else {
            fillCards();
        }
    }, [searchQuery]);

    useFocusEffect(
        useCallback(() => {
            fillCards();
        }, [])
    )
    const handleTrainingPress = (idJornada) => {
        navigation.navigate('LoginNav', {
            screen: 'Entrenamientos',
            params: { idJornada }
        });
    };

    const handleRatingsPress = (idJornada) => {
        navigation.navigate('LoginNav', {
            screen: 'Calificaciones',
            params: { idJornada }
        });
    };

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
                <Searchbar
                    placeholder="Buscar jornada..."
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    placeholderTextColor='gray'
                    style={styles.searchbar}
                />
            </View>

            {loading ? (
                <LoadingComponent />
            ) : response ? (
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
            ) : (
                <ScrollView
                    style={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                        <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron entrenamientos</Text>
                    </View>
                </ScrollView>
            )}
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
    searchbar: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        color: 'gray',
        maxHeight: windowHeight * 0.07,
        maxWidth: windowWidth * 0.9,
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