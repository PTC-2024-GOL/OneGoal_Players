import React, { useState, useEffect, useCallback } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, ScrollView,
    RefreshControl, Modal, ActivityIndicator
} from 'react-native';
import { Text, Searchbar, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PieChart } from 'react-native-gifted-charts';
import { useFocusEffect } from "@react-navigation/native";
import fetchData from '../../api/components';
import { SERVER_URL } from "../../api/constantes";
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from "../components/LoadingComponent";
import MatchesCard from '../components/Cards/MatchCard';
import logo from '../../assets/gol_blanco 2.png';
import PlayerCard from '../components/Cards/PlayerCard';
import { Card } from 'react-native-paper';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { DialogNotification, ToastNotification } from "../components/Alerts/AlertComponent";
const { width, height } = Dimensions.get('window');

// URL de la API para el usuario
const USER_API = 'services/players/jugadores.php';
const HomeScreen = ({ logueado, setLogueado }) => {
    const [username, setUsername] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [centerText, setCenterText] = useState("Selecciona un segmento");
    const [foto, setFoto] = useState("../../assets/man.png");
    const [dataPie, setDataPie] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial
    const [maxGoals, setMaxGoals] = useState([]);
    const [maxAssists, setMaxAssists] = useState([]);
    const [matches, setMatches] = useState([]);
    const [matchData, setmatchData] = useState([]);
    const [assistsData, setAssistsData] = useState([]);
    const [minutesData, setMinutesData] = useState([]);
    const [yellowData, setYellowData] = useState([]);
    const [redData, setRedData] = useState([]);
    const [data, setData] = useState(false);
    const [response, setResponse] = useState(false);
    const [response1, setResponse1] = useState(false);
    const [response2, setResponse2] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    //Constantes para la busqueda con el elemento de la libreria searchBar
    const onChangeSearch = (query) => setSearchQuery(query);

    const onSearch = () => {
        if (searchQuery != "") {
            // Navegar a la pantalla SearchScreen y pasar el query como parámetro
            navigation.navigate('SearchScreen', { searchQuery });
        } else {
            ToastNotification(2, "No puedes dejar el campo de busqueda vacio", true);
        }
    };

    //Estados para almacenar los datos
    const [stats, setStats] = useState({
        goles: " ",
        asistencias: " ",
        partidos: " ",
        minutos: " ",
        amarillas: " ",
        rojas: " ",
    });

    const navigation = useNavigation(); // Obtiene el objeto de navegación


    const [modalVisibleGoals, setModalVisibleGoals] = useState(false);
    const [modalVisibleMatches, setModalVisibleMatches] = useState(false);
    const [modalVisibleAssists, setModalVisibleAssists] = useState(false);
    const [modalVisibleMinutes, setModalVisibleMinutes] = useState(false);
    const [modalVisibleYellowCards, setModalVisibleYellowCards] = useState(false);
    const [modalVisibleRedCards, setModalVisibleRedCards] = useState(false);

    const fillMatches = async () => {
        try {
            const data = await fetchData(USER_API, 'partidosJugados');
            if (data.status) {
                const info = data.dataset.map(match => {
                    let equipoIzquierda, equipoDerecha, logoIzquierda, logoDerecha, resultadoAjustado;

                    if (match.localidad_partido === 'Local') {
                        // Si es local, mantener el orden normal.
                        equipoIzquierda = match.nombre_equipo;
                        equipoDerecha = match.nombre_rival;
                        logoIzquierda = SERVER_URL.concat('images/equipos/', match.logo_equipo);
                        logoDerecha = SERVER_URL.concat('images/rivales/', match.logo_rival);
                        resultadoAjustado = match.resultado_partido;
                    } else {
                        // Si es visitante, invertir los equipos y el resultado.
                        equipoIzquierda = match.nombre_rival;
                        equipoDerecha = match.nombre_equipo;
                        logoIzquierda = SERVER_URL.concat('images/rivales/', match.logo_rival);
                        logoDerecha = SERVER_URL.concat('images/equipos/', match.logo_equipo);

                        // Invertir el resultado (p.ej., de "2-1" a "1-2").
                        const goles = match.resultado_partido.split('-').map(gol => gol.trim());
                        resultadoAjustado = `${goles[1]} - ${goles[0]}`;
                    }

                    return {
                        ...match,
                        equipoIzquierda,
                        equipoDerecha,
                        logoIzquierda,
                        logoDerecha,
                        resultadoAjustado
                    };
                });

                setMatches(info);
                setData(true);
            } else {
                console.log(data.error);
                setData(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fillGoles = async () => {
        try {
            const data = await fetchData(USER_API, 'golesMarcados');
            if (data.status) {
                const info = data.dataset.map(gol => {
                    // Procesar los datos de cada gol
                    const rivalLogo = SERVER_URL.concat('images/rivales/', gol.logo_rival);
                    const tipoGol = gol.TIPO;
                    const cantidadGoles = gol.CANTIDAD;
                    const fecha = gol.fecha;
                    const resultadoPartido = gol.resultado_partido;
                    const tipoResultadoPartido = gol.tipo_resultado_partido;
                    const nombreRival = gol.nombre_rival;

                    return {
                        rivalLogo: rivalLogo,
                        tipo_gol: tipoGol,
                        cantidad_goles: cantidadGoles,
                        fecha: fecha,
                        resultado_partido: resultadoPartido,
                        tipo_resultado_partido: tipoResultadoPartido,
                        nombre_rival: nombreRival
                    };
                });

                setmatchData(info); // Asigna los datos de los goles a tu estado
                setData(true);
            } else {
                console.log(data.error);
                setData(false);
            }
        } catch (e) {
            console.log(e);
        }
    };


    const fillAsistencias = async () => {
        try {
            const data = await fetchData(USER_API, 'asistenciasHechas');
            if (data.status) {
                const info = data.dataset.map(gol => {
                    // Procesar los datos de cada gol
                    const rivalLogo = SERVER_URL.concat('images/rivales/', gol.logo_rival);
                    const asistencias = gol.asistencias;
                    const fecha = gol.fecha;
                    const resultadoPartido = gol.resultado_partido;
                    const tipoResultadoPartido = gol.tipo_resultado_partido;
                    const nombreRival = gol.nombre_rival;

                    return {
                        rivalLogo: rivalLogo,
                        asistencias: asistencias,
                        fecha: fecha,
                        resultado_partido: resultadoPartido,
                        tipo_resultado_partido: tipoResultadoPartido,
                        nombre_rival: nombreRival
                    };
                });

                setAssistsData(info); // Asigna los datos de los goles a tu estado
                setData(true);
            } else {
                console.log(data.error);
                setData(false);
            }
        } catch (e) {
            console.log(e);
        }
    };


    const fillMinutes = async () => {
        try {
            const data = await fetchData(USER_API, 'minutosJugados');
            if (data.status) {
                const info = data.dataset.map(gol => {
                    // Procesar los datos de cada gol
                    const rivalLogo = SERVER_URL.concat('images/rivales/', gol.logo_rival);
                    const minutos_jugados = gol.minutos_jugados;
                    const fecha = gol.fecha;
                    const resultadoPartido = gol.resultado_partido;
                    const tipoResultadoPartido = gol.tipo_resultado_partido;
                    const nombreRival = gol.nombre_rival;

                    return {
                        rivalLogo: rivalLogo,
                        minutos_jugados: minutos_jugados,
                        fecha: fecha,
                        resultado_partido: resultadoPartido,
                        tipo_resultado_partido: tipoResultadoPartido,
                        nombre_rival: nombreRival
                    };
                });

                setMinutesData(info); // Asigna los datos de los goles a tu estado
                setData(true);
            } else {
                console.log(data.error);
                setData(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fillYellowsCards = async () => {
        try {
            const data = await fetchData(USER_API, 'contarTarjetasAmarillas');
            if (data.status) {
                const info = data.dataset.map(gol => {
                    // Procesar los datos de cada gol
                    const rivalLogo = SERVER_URL.concat('images/rivales/', gol.logo_rival);
                    const amonestacion = gol.amonestacion;
                    const numero_amonestacion = gol.numero_amonestacion;
                    const fecha = gol.fecha;
                    const resultadoPartido = gol.resultado_partido;
                    const tipoResultadoPartido = gol.tipo_resultado_partido;
                    const nombreRival = gol.nombre_rival;

                    return {
                        rivalLogo: rivalLogo,
                        amonestacion: amonestacion,
                        numero_amonestacion: numero_amonestacion,
                        fecha: fecha,
                        resultado_partido: resultadoPartido,
                        tipo_resultado_partido: tipoResultadoPartido,
                        nombre_rival: nombreRival
                    };
                });

                setYellowData(info); // Asigna los datos de los goles a tu estado
                setData(true);
            } else {
                console.log(data.error);
                setData(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fillRedCards = async () => {
        try {
            const data = await fetchData(USER_API, 'contarTarjetasRojas');
            if (data.status) {
                const info = data.dataset.map(gol => {
                    // Procesar los datos de cada gol
                    const rivalLogo = SERVER_URL.concat('images/rivales/', gol.logo_rival);
                    const amonestacion = gol.amonestacion;
                    const numero_amonestacion = gol.numero_amonestacion;
                    const fecha = gol.fecha;
                    const resultadoPartido = gol.resultado_partido;
                    const tipoResultadoPartido = gol.tipo_resultado_partido;
                    const nombreRival = gol.nombre_rival;

                    return {
                        rivalLogo: rivalLogo,
                        amonestacion: amonestacion,
                        numero_amonestacion: numero_amonestacion,
                        fecha: fecha,
                        resultado_partido: resultadoPartido,
                        tipo_resultado_partido: tipoResultadoPartido,
                        nombre_rival: nombreRival
                    };
                });

                setRedData(info); // Asigna los datos de los goles a tu estado
                setData(true);
            } else {
                console.log(data.error);
                setData(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const goToPerformanceDetails = (data) => {
        setModalVisibleMatches(false);
        navigation.navigate('LoginNav', {
            screen: 'RendimientoDetalle',
            params: { data }
        });
    };

    const openModalGoals = async () => {
        setModalVisibleGoals(true);
        await fillGoles();
    };

    const openModalMatches = async () => {
        setModalVisibleMatches(true);
        await fillMatches();
    };

    const openModalAssists = async () => {
        setModalVisibleAssists(true);
        await fillAsistencias();
    };

    const openModalMinutes = async () => {
        setModalVisibleMinutes(true);
        await fillMinutes();
    };

    const openModalYellowCards = async () => {
        setModalVisibleYellowCards(true);
        await fillYellowsCards();
    };

    const openModalRedCards = async () => {
        setModalVisibleRedCards(true);
        await fillRedCards();
    };

    //Leer las estadisticas que tiene el jugador
    const readStats = async () => {
        try {
            const data = await fetchData(USER_API, "readOneStats");
            const profileData = data.dataset;
            setStats({
                goles: profileData.TOTAL_GOLES,
                asistencias: profileData.TOTAL_ASISTENCIAS,
                partidos: profileData.TOTAL_PARTIDOS,
                minutos: profileData.MINUTOS_JUGADOS,
                amarillas: profileData.TARJETAS_AMARILLAS,
                rojas: profileData.TARJETAS_ROJAS,
            });
            console.log(data.dataset);
        } catch (error) {
            console.log(error);
            setStats({
                goles: " ",
                asistencias: " ",
                partidos: " ",
                minutos: " ",
                amarillas: " ",
                rojas: " ",
            });
        } finally {
            console.log("Petición hecha");
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

    // Genera un color hexadecimal aleatorio
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    //Llena la gráfica con los datos obtenidos de la API
    const fillGraphicDoughnut = async () => {
        try {
            const response = await fetchData(USER_API, "graphicMobile");

            if (response.status) {
                let data = response.dataset.map((item) => ({
                    value: parseFloat(item.promedio, 10), // Asegúrate de que los valores sean enteros
                    color: getRandomColor(), // Asigna colores aleatorios
                    label: item.caracteristica,
                    text: `${item.caracteristica}: ${parseFloat(item.promedio, 10)}`,
                }));
                setDataPie(data);
                setResponse(true);
                // RETORNA "CARACTERISTICA Y LA NOTA"
            } else {
                setDataPie([]);
                setResponse(false);
                console.log("La respuesta no contiene datos válidos:", response);
            }
        } catch (error) {
            console.log("Error fetching datos de la gráfica:", error);
            setDataPie([]);
            setResponse(false);
        }
    };

    const fillMaxGoals = async () => {
        try {
            const DATA = await fetchData(USER_API, "maximosGoleadores");

            if (DATA.status) {
                console.log("Data procesada para maximosGoleadores:", DATA.dataset);
                let data = DATA.dataset.map((item) => ({
                    name: item.JUGADOR,
                    image: item.FOTO,
                    position: item.POSICION,
                    number: item.TOTAL_GOLES,
                }));
                setMaxGoals(data);
                console.log("MaxGoals después de setMaxGoals:", data); // Verifica los datos antes de que se actualice el estado
                setResponse1(true);
            } else {
                setMaxGoals([]);
                setResponse1(false);
                console.log("La respuesta no contiene datos válidos:", DATA);
            }
        } catch (error) {
            console.log("Error fetching maximosGoleadores:", error);
            setMaxGoals([]);
            setResponse1(false);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const fillMaxAssists = async () => {
        try {
            const response = await fetchData(USER_API, "maximosAsistentes");

            if (response.status) {
                let data = response.dataset.map((item) => ({
                    name: item.JUGADOR,
                    image: item.FOTO,
                    position: item.POSICION,
                    number: item.TOTAL_ASISTENCIAS,
                }));
                setMaxAssists(data);
                console.log("MaxAssists después de setMaxAssists:", data); // Verifica los datos antes de que se actualice el estado
                setResponse2(true);
            } else {
                setMaxAssists([]);
                setResponse2(false);
                console.log("La respuesta no contiene datos válidos:", response);
            }
        } catch (error) {
            console.log("Error fetching maximosAsistentes:", error);
            setMaxAssists([]);
            setResponse2(false);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleProfile = () => {
        navigation.navigate('LoginNav', {
            screen: 'Profile',
        });
    };

    const handleGrades = () => {
        navigation.navigate('Jornadas');
    };

    //Efecto que se ejecuta al montar el componente para inicializar la aplicación
    useEffect(() => {
        const initializeApp = async () => {
            await getUser();
            await readStats();
            await fillGraphicDoughnut();
            await fillMaxGoals();
            await fillMaxAssists();
        };
        initializeApp();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const initializeApp = async () => {
                await getUser();
                await readStats();
                await fillGraphicDoughnut();
                await fillMaxGoals();
                await fillMaxAssists();
            };
            initializeApp();
        }, [])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUser();
        await readStats();
        await fillGraphicDoughnut();
        await fillMaxGoals();
        await fillMaxAssists();
        // Aquí se llamarán las funciones necesarias para refrescar la información
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fillMaxGoals();
        fillMaxAssists();
    }, []);

    // Componente para los puntos de la leyenda
    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    // Componente que renderiza la leyenda basada en los datos de la gráfica
    const renderLegendComponent = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 10 }}>
                {dataPie.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 5,
                            width: '45%', // Para alinear 2 en cada fila
                            marginHorizontal: '2.5%' // Espacio entre los elementos
                        }}>
                        {renderDot(item.color)}
                        <Text style={{ color: '#333', fontSize: 14 }}>{item.text}</Text>
                    </View>
                ))}
            </View>
        );
    };


    //Renderizador de las cartas de los productos
    const renderPlayerItem = ({ item }) => (
        <PlayerCard item={item} />
    );

    // Método para asignar un color según la nota
    const getColorByNota = (result) => {
        if (result == 'Victoria') return '#004000';
        if (result == 'Pendiente') return '#FFD700';
        if (result == 'Derrota') return '#fa1405';
        if (result == 'Empate') return '#fadc05';
    };
    // Método para asignar un color según la nota
    const getColorByCard = (result) => {
        if (result == 'Tarjeta amarilla') return '#fadc05';
        if (result == 'Tarjeta roja') return '#fa1405';
    };
    const GolCard = ({ data }) => {
        return (
            <Card mode={"elevated"} style={styles.dateCard}>
                <View style={styles.row}>
                    {/* Sección de rival y detalles del partido */}
                    <View style={styles.col}>
                        <Image source={{ uri: data.rivalLogo }} style={styles.img} />
                        <Text style={styles.dateText}>{data.nombre_rival}</Text>
                        <Text style={styles.dateLabel}>{data.fecha}</Text>
                        <Text style={styles.dateLabel}>{data.resultado_partido}</Text>
                        <Text style={[styles.dateText, { color: getColorByNota(data.tipo_resultado_partido) }]}>{data.tipo_resultado_partido}</Text>
                    </View>

                    {/* Sección de tipo de gol y cantidad */}
                    <View style={styles.col}>
                        <Text style={styles.dateText}>{data.tipo_gol}</Text>
                        <Text style={styles.dateLabel}>{data.cantidad_goles}</Text>
                    </View>
                </View>
            </Card>
        );
    };
    const AssistsCard = ({ data }) => {
        return (
            <Card mode={"elevated"} style={styles.dateCard}>
                <View style={styles.row}>
                    {/* Sección de rival y detalles del partido */}
                    <View style={styles.col}>
                        <Image source={{ uri: data.rivalLogo }} style={styles.img} />
                        <Text style={styles.dateText}>{data.nombre_rival}</Text>
                        <Text style={styles.dateLabel}>{data.fecha}</Text>
                        <Text style={styles.dateLabel}>{data.resultado_partido}</Text>
                        <Text style={styles.dateText}>{data.tipo_resultado_partido}</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.dateText}>{data.asistencias}</Text>
                    </View>
                </View>
            </Card>
        );
    };
    const MinutesCard = ({ data }) => {
        return (
            <Card mode={"elevated"} style={styles.dateCard}>
                <View style={styles.row}>
                    {/* Sección de rival y detalles del partido */}
                    <View style={styles.col}>
                        <Image source={{ uri: data.rivalLogo }} style={styles.img} />
                        <Text style={styles.dateText}>{data.nombre_rival}</Text>
                        <Text style={styles.dateLabel}>{data.fecha}</Text>
                        <Text style={styles.dateLabel}>{data.resultado_partido}</Text>
                        <Text style={[styles.dateText, { color: getColorByNota(data.tipo_resultado_partido) }]}>{data.tipo_resultado_partido}</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.dateText}>{data.minutos_jugados}🧭</Text>
                    </View>
                </View>
            </Card>
        );
    };
    const YellowCard = ({ data }) => {
        return (
            <Card mode={"elevated"} style={styles.dateCard}>
                <View style={styles.row}>
                    {/* Sección de rival y detalles del partido */}
                    <View style={styles.col}>
                        <Image source={{ uri: data.rivalLogo }} style={styles.img} />
                        <Text style={styles.dateText}>{data.nombre_rival}</Text>
                        <Text style={styles.dateLabel}>{data.fecha}</Text>
                        <Text style={styles.dateLabel}>{data.resultado_partido}</Text>
                        <Text style={[styles.dateText, { color: getColorByNota(data.tipo_resultado_partido) }]}>{data.tipo_resultado_partido}</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={[styles.dateText, { color: getColorByCard(data.amonestacion) }]}>{data.amonestacion}</Text>
                        <Text style={styles.dateLabel}>{data.numero_amonestacion}</Text>
                    </View>
                </View>
            </Card>
        );
    };
    const RedCard = ({ data }) => {
        return (
            <Card mode={"elevated"} style={styles.dateCard}>
                <View style={styles.row}>
                    {/* Sección de rival y detalles del partido */}
                    <View style={styles.col}>
                        <Image source={{ uri: data.rivalLogo }} style={styles.img} />
                        <Text style={styles.dateText}>{data.nombre_rival}</Text>
                        <Text style={styles.dateLabel}>{data.fecha}</Text>
                        <Text style={styles.dateLabel}>{data.resultado_partido}</Text>
                        <Text style={[styles.dateText, { color: getColorByNota(data.tipo_resultado_partido) }]}>{data.tipo_resultado_partido}</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={[styles.dateText, { color: getColorByCard(data.amonestacion) }]}>{data.amonestacion}</Text>
                        <Text style={styles.dateLabel}>{data.numero_amonestacion}</Text>
                    </View>
                </View>
            </Card>
        );
    };

    return (
        <AlertNotificationRoot>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" colors={['white', 'white', 'white']}
                        progressBackgroundColor="#020887" />}
            >
                <LinearGradient colors={['#F2F7FF', '#F2F7FF']} style={styles.linearGradient}>
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
                                value={searchQuery}
                                onChangeText={onChangeSearch}
                                onIconPress={onSearch}
                            />
                        </View>
                    </View>

                    {/* Sección de Perfil */}
                    <View style={styles.inputContainer}>
                        <View style={styles.infoRow}>
                            <View style={styles.rowContent2}>
                                <AntDesign name="user" size={24} />
                                <Text style={styles.label}>Mi perfil</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Image
                                    source={{ uri: foto }} // Reemplaza con la URL de la imagen o usa require para imagen local
                                    style={styles.profileImage}
                                />
                                <View>
                                    <Text style={styles.profileName}>{username}</Text>
                                    <TouchableOpacity style={styles.viewProfileButton} onPress={handleProfile}>
                                        <Text style={styles.viewProfileText}>Ver mi perfil</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.centrar}>
                        <View style={styles.infoRowGraphic}>
                            {/* Gráfica de Progreso de Entrenamientos */}
                            <View style={styles.trainingChartContainer}>
                                <View style={styles.rowContent3}>
                                    <Text style={styles.trainingChartText}>Calificación total de entrenamientos</Text>
                                </View>
                                {/*Muestra la gráfica de dona */}
                                {response && Array.isArray(dataPie) && dataPie.length > 0 ? (
                                    <View style={styles.rowContent4}>
                                        <PieChart
                                            data={dataPie}
                                            donut
                                            radius={100}
                                            innerRadius={50}
                                            textColor="black"
                                            textSize={12}
                                            showGradient
                                            onPress={(index) => {
                                                setCenterText(index.text || "Selecciona un segmento");
                                            }}
                                            centerLabelComponent={() => {
                                                return <Text style={{ fontSize: 12 }}>{centerText}</Text>;
                                            }}
                                        />
                                        {renderLegendComponent()}
                                        <TouchableOpacity style={styles.viewtrainingButton} onPress={handleGrades}>
                                            <Text style={styles.viewProfileText}>Ver mas detalles</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            height: 200,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                            <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron datos para la graficas</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Sección de Estadísticas */}
                    <View style={styles.statsContainer}>
                        <Surface style={[styles.surface, { backgroundColor: '#020887' }]} elevation={5}>
                            <TouchableOpacity style={styles.statBox} onPress={() => openModalMatches()}>
                                <MaterialCommunityIcons name="soccer-field" size={24} color="white" />
                                <Text style={styles.statValue}>{stats.partidos}</Text>
                                <Text style={styles.statLabel}>Total partidos</Text>
                            </TouchableOpacity>
                        </Surface>
                        <Surface style={[styles.surface, { backgroundColor: '#5209B0' }]} elevation={5}>
                            <TouchableOpacity style={styles.statBox} onPress={() => openModalGoals()}>
                                <MaterialCommunityIcons name="soccer" size={24} color="white" />
                                <Text style={styles.statValue}>{stats.goles}</Text>
                                <Text style={styles.statLabel}>Total goles</Text>
                            </TouchableOpacity>
                        </Surface>
                        <Surface style={[styles.surface, { backgroundColor: '#020887' }]} elevation={5}>
                            <TouchableOpacity style={styles.statBox} onPress={() => openModalAssists()}>
                                <MaterialCommunityIcons name="shoe-cleat" size={24} color="white" />
                                <Text style={styles.statValue}>{stats.asistencias}</Text>
                                <Text style={styles.statLabel}>Total asistencias</Text>
                            </TouchableOpacity>
                        </Surface>
                    </View>

                    {/* Sección de Estadísticas 2*/}
                    <View style={styles.statsContainer}>
                        <Surface style={[styles.surface, { backgroundColor: '#5209B0' }]} elevation={5}>
                            <TouchableOpacity style={styles.statBox} onPress={() => openModalMinutes()}>
                                <MaterialCommunityIcons name="camera-timer" size={24} color="white" />
                                <Text style={styles.statValue}>{stats.minutos}</Text>
                                <Text style={styles.statLabel}>Minutos jugados</Text>
                            </TouchableOpacity>
                        </Surface>
                        <Surface style={[styles.surface, { backgroundColor: '#dac002' }]} elevation={5}>
                            <TouchableOpacity style={styles.statBox} onPress={() => openModalYellowCards()}>
                                <MaterialCommunityIcons name="card" size={24} color="white" />
                                <Text style={styles.statValue}>{stats.amarillas}</Text>
                                <Text style={styles.statLabel}>Tarjetas amarillas</Text>
                            </TouchableOpacity>
                        </Surface>
                        <Surface style={[styles.surface, { backgroundColor: '#bd1100' }]} elevation={5}>
                            <TouchableOpacity style={styles.statBox} onPress={() => openModalRedCards()}>
                                <MaterialCommunityIcons name="card" size={24} color="white" />
                                <Text style={styles.statValue}>{stats.rojas}</Text>
                                <Text style={styles.statLabel}>Tarjetas rojas</Text>
                            </TouchableOpacity>
                        </Surface>
                    </View>



                    {/* Comparación con el resto del equipo */}
                    <View style={styles.centrar}>
                        <View style={styles.infoRowGraphic}>
                            <View style={styles.trainingChartContainer}>
                                <View style={styles.rowContent3}>
                                    <Text style={styles.trainingChartText}>Máximos goleadores</Text>
                                </View>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.tableHeaderText}>Jugador</Text>
                                    <Text style={styles.tableHeaderText}>
                                        <MaterialCommunityIcons name="soccer" size={20} color="white" />
                                    </Text>
                                </View>
                                {loading ? (
                                    <LoadingComponent />
                                ) : response1 && Array.isArray(maxGoals) && maxGoals.length > 0 ? (
                                    <View
                                        style={styles.scrollView}
                                    >
                                        {maxGoals.map((item, index) => (
                                            <View key={index}>
                                                {renderPlayerItem({ item })}
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <ScrollView
                                        style={styles.scrollView}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                    >
                                        <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                            <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron datos de goleadores</Text>
                                        </View>
                                    </ScrollView>
                                )}
                            </View>
                        </View>
                    </View>

                    <View style={styles.centrar}>
                        <View style={styles.infoRowGraphic}>
                            <View style={styles.trainingChartContainer}>
                                <View style={styles.rowContent3}>
                                    <Text style={styles.trainingChartText}>Máximos asistentes</Text>
                                </View>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.tableHeaderText}>Jugador</Text>
                                    <Text style={styles.tableHeaderText}>
                                        <MaterialCommunityIcons name="shoe-cleat" size={20} color="white" />
                                    </Text>
                                </View>
                                {loading ? (
                                    <LoadingComponent />
                                ) : response2 && Array.isArray(maxAssists) && maxAssists.length > 0 ? (
                                    <View
                                        style={styles.scrollView}
                                    >
                                        {maxAssists.map((item, index) => (
                                            <View key={index}>
                                                {renderPlayerItem({ item })}
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <ScrollView
                                        style={styles.scrollView}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                    >
                                        <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                            <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron datos de asistentes</Text>
                                        </View>
                                    </ScrollView>
                                )}
                            </View>
                        </View>
                    </View>
                </LinearGradient>


                {/* Modal de goles */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleGoals}
                    onRequestClose={() => setModalVisibleGoals(false)}
                >
                    <View style={styles.modalCenter}>
                        <View style={styles.modalContainer}>
                            <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
                                <View style={styles.modalRow}>
                                    <Image style={styles.modalImage} source={require('../../assets/gol_blanco 2.png')} />
                                    <Text style={styles.modalTitle}>Goles</Text>
                                </View>
                            </LinearGradient>

                            <ScrollView>
                                <View style={styles.modalContent}>
                                    {
                                        data ? (
                                            matchData.map((item, index) => (
                                                <View style={styles.rowContent} key={index}>
                                                    <GolCard data={item} />
                                                </View>
                                            ))
                                        ) : (
                                            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                                <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No haz marcado ningún gol</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisibleGoals(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal de partidos */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleMatches}
                    onRequestClose={() => setModalVisibleMatches(false)}
                >
                    <View style={styles.modalCenter}>
                        <View style={styles.modalContainer}>
                            <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
                                <View style={styles.modalRow}>
                                    <Image style={styles.modalImage} source={require('../../assets/gol_blanco 2.png')} />
                                    <Text style={styles.modalTitle}>Partidos</Text>
                                </View>
                            </LinearGradient>
                            <ScrollView>
                                <View style={styles.cardsContainer}>
                                    {
                                        data ? (
                                            matches.map((item, index) => (
                                                <MatchesCard
                                                    key={index}
                                                    data={item}
                                                    teamImg={item.logoIzquierda}
                                                    rivalImg={item.logoDerecha}
                                                    goToScreen={goToPerformanceDetails}
                                                />
                                            ))
                                        ) : (
                                            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                                <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No tienes partidos jugados</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisibleMatches(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal de asistencias */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleAssists}
                    onRequestClose={() => setModalVisibleAssists(false)}
                >
                    <View style={styles.modalCenter}>
                        <View style={styles.modalContainer}>
                            <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
                                <View style={styles.modalRow}>
                                    <Image style={styles.modalImage} source={require('../../assets/gol_blanco 2.png')} />
                                    <Text style={styles.modalTitle}>Asistencias</Text>
                                </View>
                            </LinearGradient>

                            <ScrollView>
                                <View style={styles.modalContent}>
                                    {
                                        data ? (
                                            assistsData.map((item, index) => (
                                                <View style={styles.rowContent} key={index}>
                                                    <AssistsCard data={item} />
                                                </View>
                                            ))
                                        ) : (
                                            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                                <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No tienes asistencias hechas</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisibleAssists(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                {/* Modal de minutos jugados */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleMinutes}
                    onRequestClose={() => setModalVisibleMinutes(false)}
                >
                    <View style={styles.modalCenter}>
                        <View style={styles.modalContainer}>
                            <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
                                <View style={styles.modalRow}>
                                    <Image style={styles.modalImage} source={require('../../assets/gol_blanco 2.png')} />
                                    <Text style={styles.modalTitle}>Minutos jugados</Text>
                                </View>
                            </LinearGradient>

                            <ScrollView>
                                <View style={styles.modalContent}>
                                    {
                                        data ? (
                                            minutesData.map((item, index) => (
                                                <View style={styles.rowContent} key={index}>
                                                    <MinutesCard data={item} />
                                                </View>
                                            ))
                                        ) : (
                                            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                                <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No tienes minutos jugados</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisibleMinutes(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal de tarjetas amarillas */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleYellowCards}
                    onRequestClose={() => setModalVisibleYellowCards(false)}
                >
                    <View style={styles.modalCenter}>
                        <View style={styles.modalContainer}>
                            <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
                                <View style={styles.modalRow}>
                                    <Image style={styles.modalImage} source={require('../../assets/gol_blanco 2.png')} />
                                    <Text style={styles.modalTitle}>Tarjetas amarillas</Text>
                                </View>
                            </LinearGradient>

                            <ScrollView>
                                <View style={styles.modalContent}>
                                    {
                                        data ? (
                                            yellowData.map((item, index) => (
                                                <View style={styles.rowContent} key={index}>
                                                    <YellowCard data={item} />
                                                </View>
                                            ))
                                        ) : (
                                            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                                <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No tienes tarjetas amarillas</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisibleYellowCards(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal de tarjetas rojas */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleRedCards}
                    onRequestClose={() => setModalVisibleRedCards(false)}
                >
                    <View style={styles.modalCenter}>
                        <View style={styles.modalContainer}>
                            <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
                                <View style={styles.modalRow}>
                                    <Image style={styles.modalImage} source={require('../../assets/gol_blanco 2.png')} />
                                    <Text style={styles.modalTitle}>Tarjetas rojas</Text>
                                </View>
                            </LinearGradient>

                            <ScrollView>
                                <View style={styles.modalContent}>
                                    {
                                        data ? (
                                            redData.map((item, index) => (
                                                <View style={styles.rowContent} key={index}>
                                                    <RedCard data={item} />
                                                </View>
                                            ))
                                        ) : (
                                            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                                <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No tienes tarjetas rojas</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisibleRedCards(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </AlertNotificationRoot>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: height * 0.13,
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
        maxHeight: height * 0.07,
        maxWidth: width * 0.9,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: width * 0.15,
        height: height * 0.1,
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
        alignItems: 'center',
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
        height: height * 0.18,
        elevation: 2,
    },
    centrar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoRowGraphic: {
        padding: 12,
        margin: 2,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "white",
        width: width * 0.9,
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
    rowContent4: {
        alignItems: "center",
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
    modalCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: height * 0.07,
        marginBottom: height * 0.13,
    },
    headerModal: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
    },
    modalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalContent: {
        padding: 20,
    },
    closeButton: {
        backgroundColor: '#F44262',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#334195',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    tableHeaderText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 15,
    },
    tableText: {
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },
    dateCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderStartColor: '#020887',
        borderStartWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.7,
        maxHeight: height * 0.25, // Asegura una altura mínima
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    dateLabel: {
        fontSize: 14,
        color: '#333',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    col: {
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginBottom: 8,
    },
});
