import React, { useState, useEffect, useCallback } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, ScrollView,
    RefreshControl
} from 'react-native';
import { Text, Searchbar, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PieChart } from 'react-native-gifted-charts';
import { useFocusEffect } from "@react-navigation/native";
import fetchData from '../../api/components';
import { SERVER_URL } from "../../api/constantes";

import logo from '../../assets/gol_blanco 2.png';
const { width, height } = Dimensions.get('window');

// URL de la API para el usuario
const USER_API = 'services/players/jugadores.php';
const HomeScreen = ({ logueado, setLogueado }) => {
    const [username, setUsername] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [centerText, setCenterText] = useState("Selecciona un segmento");
    const [foto, setFoto] = useState("../../assets/man.png");

    // Simulación de la función de cierre de sesión
    const handleLogOut = async () => {
        try {
            // Lógica de cierre de sesión
            setLogueado(false);
        } catch (error) {
            console.log('Error al cerrar sesión: ', error);
        }
    };

    //Obtiene la información del usuario desde la API
    const getUser = async () => {
        try {
            const data = await fetchData(USER_API, "getUserMobile");
            if (data.status) {
                const [firstName] = data.username.split(" ");
                const [firstSurname] = data.apellido.split(" ");
                setUsername(`${firstName} ${firstSurname}`);
                setFoto(`${SERVER_URL}images/jugadores/${data.foto}`);
            } else {
                console.log("Error: Nombre de jugador indefinido");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Datos para la gráfica circular
    const pieData = [
        { value: 50, color: '#00BFFF', text: 'Técnicos' },
        { value: 20, color: '#EE9512', text: 'Físicos' },
        { value: 15, color: '#26BFE5', text: 'Tácticos' },
        { value: 15, color: '#EF6347', text: 'Psicológicos' },
    ];

    //Efecto que se ejecuta al montar el componente para inicializar la aplicación
    useEffect(() => {
        const initializeApp = async () => {
            await getUser();
        };
        initializeApp();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const initializeApp = async () => {
                await getUser();
            };
            initializeApp();
        }, [])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUser();
        // Aquí se llamarán las funciones necesarias para refrescar la información
        setRefreshing(false);
    }, []);

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <LinearGradient colors={['#EEEEEE', '#F2F7FF']} style={styles.linearGradient}>
                {/* Imagen Superior con Texto y Buscador */}
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/home.png')}  // Asegúrate de usar la ruta correcta a la imagen
                        style={styles.headerImage}
                    />
                    <View style={styles.headerOverlay}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.headerText}>Es un placer tenerte de regreso</Text>
                        <Text style={styles.headerSubText}>“Nunca pierdas de vista tus sueños, ellos son la clave de tu éxito”</Text>
                        <Searchbar
                            placeholder="Buscar partido..."
                            placeholderTextColor='gray'
                            style={styles.searchbar}
                        />
                    </View>
                </View>

                {/* Sección de Perfil */}
                <View style={styles.inputContainer}>
                    <View style={styles.rowContent2}>
                        <AntDesign name="user" size={24} />
                        <Text style={styles.label}>Mi perfil</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.rowContent}>
                            <Image
                                source={{ uri: foto }} // Reemplaza con la URL de la imagen o usa require para imagen local
                                style={styles.profileImage}
                            />
                            <View>
                                <Text style={styles.profileName}>{username}</Text>
                                <TouchableOpacity style={styles.viewProfileButton}>
                                    <Text style={styles.viewProfileText}>Ver mi perfil</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Gráfica de Progreso de Entrenamientos */}
                <View style={styles.trainingChartContainer}>
                    <View style={styles.rowContent3}>
                        <Text style={styles.trainingChartText}>Calificación total de entrenamientos</Text>
                    </View>
                    <PieChart
                        data={pieData}
                        donut
                        radius={100}
                        innerRadius={50}
                        textColor="black"
                        textSize={12}
                        onPress={(index) => {
                            setCenterText(index.text || "Selecciona un segmento");
                        }}
                        centerLabelComponent={() => {
                            return <Text style={{ fontSize: 12 }}>{centerText}</Text>;
                        }}
                    />
                    <Text style={styles.chartPercentage}>Técnicos: 50%</Text>
                    <Text style={styles.chartPercentage}>Físicos: 20%</Text>
                    <Text style={styles.chartPercentage}>Tácticos: 15%</Text>
                    <Text style={styles.chartPercentage}>Psicológicos: 15%</Text>
                    <TouchableOpacity style={styles.viewtrainingButton}>
                        <Text style={styles.viewProfileText}>Ver mas detalles</Text>
                    </TouchableOpacity>
                </View>

                {/* Sección de Estadísticas */}
                <View style={styles.statsContainer}>

                    <Surface style={[styles.surface, { backgroundColor: '#020887' }]} elevation={5}>
                        <View style={styles.statBox}>
                            <MaterialCommunityIcons name="soccer-field" size={24} color="white" />
                            <Text style={styles.statValue}>10</Text>
                            <Text style={styles.statLabel}>Total partidos</Text>
                        </View>
                    </Surface>
                    <Surface style={[styles.surface, { backgroundColor: '#5209B0' }]} elevation={5}>
                        <View style={styles.statBox}>
                            <MaterialCommunityIcons name="soccer" size={24} color="white" />
                            <Text style={styles.statValue}>15</Text>
                            <Text style={styles.statLabel}>Total goles</Text>
                        </View>
                    </Surface>
                    <Surface style={[styles.surface, { backgroundColor: '#020887' }]} elevation={5}>
                        <View style={styles.statBox}>
                            <MaterialCommunityIcons name="shoe-cleat" size={24} color="white" />
                            <Text style={styles.statValue}>10</Text>
                            <Text style={styles.statLabel}>Total asistencias</Text>
                        </View>
                    </Surface>
                </View>
            </LinearGradient>
        </ScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: height * 0.11,
    },
    linearGradient: {
        flex: 1
    },
    headerContainer: {
        position: 'relative',
        height: height * 0.45,
        alignItems: 'center',
    },
    headerImage: {
        width: width * 1,
        height: height * 0.45,
        resizeMode: 'cover',
    },
    headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Oscurece la imagen
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        maxWidth: width * 0.9,
    },
    headerSubText: {
        color: 'white',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        maxWidth: width * 0.9,
    },
    searchInput: {
        width: '90%',
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    searchbar: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#EBF0FF',
        color: 'gray',
        maxHeight: height * 0.08,
        maxWidth: width * 0.9,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileName: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: width * 0.65,
    },
    viewProfileButton: {
        marginTop: 10,
        marginRight: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#0077B6',
        borderRadius: 5,
    },
    viewProfileText: {
        color: 'white',
    },
    viewtrainingButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F44262',
        borderRadius: 5,
    },
    trainingChartContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    trainingChartText: {
        fontSize: 16,
        fontWeight: 'bold',
        maxWidth: width * 0.96,
        marginBottom: 15,
    },
    chartCenterText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    chartPercentage: {
        marginTop: 10,
        fontSize: 12,
        color: '#333',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        color: 'white',
    },
    inputContainer: {
        marginBottom: 20,
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: "black",
        marginBottom: 5,
        fontWeight: 'bold',
    },
    infoRow: {
        padding: 12,
        margin: 2,
        borderRadius: 10,
        backgroundColor: "white",
        width: "100%",
        elevation: 2,
    },
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    rowContent2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    rowContent3: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        backgroundColor: "transparent",
        height: 40,
        borderWidth: 0,
        flex: 1,
    },
    surface: {
        padding: 5,
        height: height * 0.15,
        width: width * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
});
