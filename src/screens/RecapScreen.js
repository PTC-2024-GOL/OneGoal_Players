import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Image, ScrollView, Animated } from 'react-native';
import { ProgressBar, Surface, Text as RNPText } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient'; // Asegúrate de tener expo-linear-gradient instalado
import MatchesCard from '../components/Cards/MatchCardRecap';
import fetchData from '../../api/components';
import { SERVER_URL } from "../../api/constantes";
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const stories = [
    { id: 1, content: 'Introducción' },
    { id: 2, content: 'Tus mejores partidos' },
    { id: 3, content: 'Tus estadisticas en partidos' },
    { id: 4, content: 'Tus estadisticas en goles' },
    { id: 5, content: 'Resumen' },
];
import recap1 from '../../assets/recap gol imagen stats.png';
import recap2 from '../../assets/recap gol intro.png';
import recap3 from '../../assets/recap gol stats.png';
import recap4 from '../../assets/recap gol campeon.png';
import recap5 from '../../assets/recap gol partido.png';

export default function RecapScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [matches, setMatches] = useState([]);
    const translateX = useRef(new Animated.Value(0)).current;

    //Estados para almacenar los datos
    const [stats, setStats] = useState({
        goles: " ",
        asistencias: " ",
        partidos: " ",
        minutos: " ",
        amarillas: " ",
        rojas: " ",
        nota: " ",
    });
    const USER_API = 'services/players/jugadores.php';
    const navigation = useNavigation(); // Obtiene el objeto de navegación
    const fillMatches = async () => {
        try {
            const data = await fetchData(USER_API, 'MejoresPartidos');
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
            } else {
            }
        } catch (e) {
        }
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
                nota: profileData.PROMEDIO,
            });
        } catch (error) {
            console.log(error);
            setStats({
                goles: " ",
                asistencias: " ",
                partidos: " ",
                minutos: " ",
                amarillas: " ",
                rojas: " ",
                nota: " ",
            });
        } finally {
            console.log("Petición hecha");
        }
    };

    const goToPerformanceDetails = (data) => {
        navigation.navigate('LoginNav', {
            screen: 'RendimientoDetalle',
            params: { data }
        });
    };
    //Efecto que se ejecuta al montar el componente para inicializar la aplicación
    useEffect(() => {
        const initializeApp = async () => {
            await fillMatches();
            await readStats();
        };
        initializeApp();
    }, []);

    useEffect(() => {
        let interval;
        if (progress < 1) {
            interval = setInterval(() => {
                setProgress((prev) => prev + 0.05);
            }, 100);
        } else {
            nextStory();
        }

        return () => clearInterval(interval);
    }, [progress]);

    const nextStory = () => {
        Animated.timing(translateX, {
            toValue: -screenWidth,  // Se desplaza a la izquierda
            duration: 300,  // Duración de la animación en milisegundos
            useNativeDriver: true,
        }).start(() => {
            setProgress(0);
            setCurrentIndex((prevIndex) => {
                if (prevIndex < stories.length - 1) {
                    return prevIndex + 1;
                } else {
                    return 0;  // Reinicia a la primera historia
                }
            });
            translateX.setValue(0); // Restablece la posición de la animación
        });
    };

    const previousStory = () => {
        Animated.timing(translateX, {
            toValue: screenWidth,  // Se desplaza a la derecha
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setProgress(0);
            setCurrentIndex((prevIndex) => {
                if (prevIndex > 0) {
                    return prevIndex - 1;
                } else {
                    return stories.length - 1;
                }
            });
            translateX.setValue(0);
        });
    };


    const renderStoryContent = () => {
        switch (currentIndex) {
            case 0:
                return (
                    <View style={styles.introContainer}>
                        <Text style={styles.introText}>
                            Recordemos algunos de tus momentos destacados durante este mes
                        </Text>
                        <Image
                            source={recap1}
                            style={styles.introImage}
                        />
                        <Text style={styles.subText}>¡Acompáñanos en este recorrido!</Text>
                        <Image
                            source={recap4}
                            style={styles.introImage}
                        />
                    </View>
                );
            case 1:
                return (
                    <View style={styles.contentContainer}>
                        <Text style={styles.storyText}>
                            Recuerda tus mejores partidos
                        </Text>
                        <ScrollView>
                            <View style={styles.cardsContainer}>
                                {
                                    matches.map((item, index) => (
                                        <MatchesCard
                                            key={index}
                                            data={item}
                                            teamImg={item.logoIzquierda}
                                            rivalImg={item.logoDerecha}
                                            goToScreen={goToPerformanceDetails}
                                        />
                                    ))
                                }
                            </View>
                        </ScrollView>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.contentContainer}>
                        <Text style={styles.storyText}>
                            Mira tus estadisticas en partidos
                        </Text>
                        <Image
                            source={recap2}
                            style={styles.statsImage}
                        />
                        {/* Sección de Estadísticas */}
                        <View style={styles.statsContainer}>
                            <Surface style={[styles.surface, { backgroundColor: '#203BDC' }]} elevation={5}>
                                <TouchableOpacity style={styles.statBox}>
                                    <MaterialCommunityIcons name="soccer-field" size={24} color="white" />
                                    <RNPText style={styles.statValue}>{stats.partidos}</RNPText>
                                    <RNPText style={styles.statLabel}>Total partidos</RNPText>
                                </TouchableOpacity>
                            </Surface>
                            <Surface style={[styles.surface, { backgroundColor: '#203BDC' }]} elevation={5}>
                                <TouchableOpacity style={styles.statBox}>
                                    <MaterialCommunityIcons name="camera-timer" size={24} color="white" />
                                    <RNPText style={styles.statValue}>{stats.minutos}</RNPText>
                                    <RNPText style={styles.statLabel}>Minutos jugados</RNPText>
                                </TouchableOpacity>
                            </Surface>
                            <Surface style={[styles.surface, { backgroundColor: '#203BDC' }]} elevation={5}>
                                <TouchableOpacity style={styles.statBox}>
                                    <MaterialCommunityIcons name="soccer" size={24} color="white" />
                                    <RNPText style={styles.statValue}>{stats.nota}</RNPText>
                                    <RNPText style={styles.statLabel}>Tu nota promedio</RNPText>
                                </TouchableOpacity>
                            </Surface>
                        </View>
                        <Image
                            source={recap5}
                            style={styles.statsImage}
                        />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.contentContainer}>
                        <Text style={styles.storyText}>
                            Revisa tu desempeño individual
                        </Text>
                        <Image
                            source={recap3}
                            style={styles.stats2Image}
                        />
                        {/* Sección de Estadísticas 2*/}
                        <View style={styles.statsContainer}>
                            <Surface style={[styles.surface, { backgroundColor: '#203BDC' }]} elevation={5}>
                                <TouchableOpacity style={styles.statBox}>
                                    <MaterialCommunityIcons name="soccer" size={24} color="white" />
                                    <RNPText style={styles.statValue}>{stats.goles}</RNPText>
                                    <RNPText style={styles.statLabel}>Total goles</RNPText>
                                </TouchableOpacity>
                            </Surface>
                            <Surface style={[styles.surface, { backgroundColor: '#203BDC' }]} elevation={5}>
                                <TouchableOpacity style={styles.statBox}>
                                    <MaterialCommunityIcons name="shoe-cleat" size={24} color="white" />
                                    <RNPText style={styles.statValue}>{stats.asistencias}</RNPText>
                                    <RNPText style={styles.statLabel}>Total asistencias</RNPText>
                                </TouchableOpacity>
                            </Surface>
                        </View>
                        {/* Sección de Estadísticas 3*/}
                        <View style={styles.statsContainer}>
                            <Surface style={[styles.surface, { backgroundColor: '#dac002' }]} elevation={5}>
                                <TouchableOpacity style={styles.statBox}>
                                    <MaterialCommunityIcons name="card" size={24} color="white" />
                                    <RNPText style={styles.statValue}>{stats.amarillas}</RNPText>
                                    <RNPText style={styles.statLabel}>Tarjetas amarillas</RNPText>
                                </TouchableOpacity>
                            </Surface>
                            <Surface style={[styles.surface, { backgroundColor: '#bd1100' }]} elevation={5}>
                                <TouchableOpacity style={styles.statBox}>
                                    <MaterialCommunityIcons name="card" size={24} color="white" />
                                    <RNPText style={styles.statValue}>{stats.rojas}</RNPText>
                                    <RNPText style={styles.statLabel}>Tarjetas rojas</RNPText>
                                </TouchableOpacity>
                            </Surface>
                        </View>
                    </View>
                );
            case 4:
                return (
                    <View style={styles.contentContainer}>
                        <Text style={styles.storyText}>
                            Tu resumen del mes
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Barras de progreso múltiples */}
            <View style={styles.progressContainer}>
                {stories.map((_, index) => (
                    <ProgressBar
                        key={index}
                        progress={currentIndex === index ? progress : currentIndex > index ? 1 : 0}
                        color="#fff"
                        style={styles.progressBar}
                    />
                ))}
            </View>

            {/* Fondo con LinearGradient */}
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']} // Puedes personalizar los colores aquí
                style={styles.gradientBackground}
            >
                {/* Renderiza el contenido específico de cada historia */}
                <Animated.View style={[styles.contentContainer, { transform: [{ translateX }] }]}>
                    {renderStoryContent()}
                </Animated.View>

            </LinearGradient>

            {/* Botones de navegación */}
            <TouchableOpacity style={styles.leftButton} onPress={previousStory} />
            <TouchableOpacity style={styles.rightButton} onPress={nextStory} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 50,
        width: screenWidth * 0.9,
    },
    progressBar: {
        width: (screenWidth * 0.9) / stories.length - 5,
        height: 4,
    },
    gradientBackground: {
        flex: 1,
        width: screenWidth,
        height: screenHeight * 0.8,
        marginTop: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    introContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    introText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        width: screenWidth * 0.9,
        marginTop: screenHeight * 0.04,
    },
    introImage: {
        width: screenWidth * 0.6,
        height: screenHeight * 0.31,
        resizeMode: 'contain',
        borderWidth: 2, // Ancho del borde
        borderRadius: 25, // Esquinas redondeadas
    },
    statsImage: {
        width: screenWidth * 0.7,
        height: screenHeight * 0.28,
        resizeMode: 'contain',
        borderWidth: 2, // Ancho del borde
        borderRadius: 25, // Esquinas redondeadas
    },
    stats2Image: {
        width: screenWidth * 0.7,
        height: screenHeight * 0.36,
        resizeMode: 'contain',
        borderWidth: 2, // Ancho del borde
        borderRadius: 25, // Esquinas redondeadas
    },
    subText: {
        color: '#ccc',
        fontSize: 16,
        textAlign: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'flex-start', // Asegura que los elementos se alineen arriba
        flex: 1, // Ocupa todo el espacio vertical
    },
    storyText: {
        marginTop: screenHeight * 0.04,
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    leftButton: {
        position: 'absolute',
        left: 0,
        width: '50%',
        height: '100%',
    },
    rightButton: {
        position: 'absolute',
        right: 0,
        width: '50%',
        height: '100%',
    },
    cardsContainer: {
        marginHorizontal: 4,
        marginVertical: 24
    },
    statsContainer: {
        flexDirection: 'row',
        paddingVertical: 2,
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
    surface: {
        padding: 5,
        height: screenHeight * 0.15,
        width: screenWidth * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        margin: 10,
    },
});
