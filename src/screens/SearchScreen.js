import React, { useState, useEffect, useCallback } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, ScrollView,
    RefreshControl, Modal, ActivityIndicator
} from 'react-native';
import { Text, Searchbar, Surface } from 'react-native-paper';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { DialogNotification, ToastNotification } from "../components/Alerts/AlertComponent";
import MatchesCard from "../components/Cards/MatchesCard";
import { IMAGES_URL } from "../../api/constantes";
import fetchData from "../../api/components";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SearchScreen = ({ setLogueado, logueado }) => {
    const route = useRoute();
    const { search } = route.params;
    const [searchQuery, setSearchQuery] = useState(search);
    const navigation = useNavigation();
    // URL de la API para el usuario
    const USER_API = 'services/players/partidos.php';
    const [matches, setMatches] = useState([]);
    const [data, setData] = useState(false);
    //Constantes para la busqueda con el elemento de la libreria searchBar
    const onChangeSearch = (query) => setSearchQuery(query);


    const fillCards = async (searchForm) => {
        try {
            const data = await fetchData(USER_API, 'searchRowsByIdJugador', searchForm);
            if (data.status) {
                const info = data.dataset;
                setMatches(info);
                setData(true)
            } else {
                console.log(data.error)
                setData(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const goToPerformanceDetails = (data) => {
        navigation.navigate('LoginNav', {
            screen: 'RendimientoDetalle',
            params: { data }
        });
    };


    useEffect(() => {
        const initializeApp = async () => {
            console.log(search);
            setSearchQuery(search);
        };
        initializeApp();
    }, [search]);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const initializeApp = async () => {
            await delay(200);
            if (searchQuery != "") {
                const formData = new FormData();
                formData.append("search", searchQuery);
                await fillCards(formData);
            } else {
                
            }
        };
        initializeApp();
    }, [searchQuery]);

    return (
        <AlertNotificationRoot>
            <View style={styles.globalContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Busca tus partidos</Text>
                    <View style={styles.row}>
                        <Image style={{ width: 25, height: 25 }} source={require('../../assets/icons/soccerBall.png')} />
                        <Text style={styles.textContent}>Selecciona el partido del que quieres ver
                            tu rendimiento.</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.rowButton}>
                        <Searchbar
                            placeholder="Buscar partido..."
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            placeholderTextColor='gray'
                            style={styles.searchbar}
                        />
                    </View>
                    <ScrollView>
                        <View style={styles.cardsContainer}>
                            {
                                data ? (
                                    matches.map((item, index) => (
                                        <MatchesCard
                                            key={index}
                                            data={item}
                                            teamImg={`${IMAGES_URL}equipos/${item.logo_equipo}`}
                                            rivalImg={`${IMAGES_URL}rivales/${item.logo_rival}`}
                                            goToScreen={goToPerformanceDetails}
                                        />
                                    ))
                                ) : (
                                    <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                        <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron datos de goleadores</Text>
                                    </View>
                                )
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </AlertNotificationRoot>
    )
};

export default SearchScreen;

const styles = StyleSheet.create({
    globalContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    container: {
        marginHorizontal: width * 0.05,
        marginBottom: height * 0.4
    },
    title: {
        fontSize: 20,
        marginTop: 25,
        fontFamily: 'Poppins_600SemiBold'
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
    },
    textContent: {
        fontFamily: 'Poppins_300Light',
        marginTop: 12,
        width: '80%'
    },
    rowButton: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: "row",
        gap: 20,
        justifyContent: "center"
    },
    line: {
        height: 0.5,
        backgroundColor: '#BEBEBE'
    },
    cardsContainer: {
        marginHorizontal: 4,
        marginVertical: 24
    },
    searchbar: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        color: 'gray',
        maxHeight: height * 0.07,
        maxWidth: width * 0.9,
    },
    scrollView: {
        flex: 1,
    },
})
