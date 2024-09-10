import { StyleSheet, View, Text, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Chip } from "react-native-paper";
import { useCallback, useState } from "react";
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import Entypo from "@expo/vector-icons/Entypo";
import { useFocusEffect, useRoute } from "@react-navigation/native"; // Importa useRoute
import InfoPlayers from "../components/playersComponent/InfoPlayer";
import TrainingPlayer from "../components/playersComponent/TrainingPlayer";
//import AssistancePlayer from "../components/playersComponent/AssistancePlayer";
import fetchData from "../../api/components";
import AlertComponent from '../components/AlertComponent';

import { SERVER_URL } from "../../api/constantes";

const ProfileScreen = ({ logueado, setLogueado }) => {
    // Manejo del cambio de pantallas.
    const [activeSection, setActiveSection] = useState('informacion');
    // Manejo para el estilo de los botones.
    const [activeChip, setActiveChip] = useState('informacion');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState(1);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertCallback, setAlertCallback] = useState(null);
    const [players, setPlayers] = useState([]);
    const API_PLAYERS = 'services/players/jugadores.php';
    const API_ESTADO_FISICO = 'services/players/estado_fisico_jugador.php';
    const [estadoFisico, setEstadoFisico] = useState([]);

    const navigation = useNavigation();


    // Función que permite el cambio de pantallas, recibe un parámetro (opciones de los botones (informacion, rendimiento o asistencias))
    const changeScreen = (section) => {
        // Manejo para el cambio de pantalla
        setActiveSection(section);
        // Manejo para el estilo de los chips
        setActiveChip(section);
    };

    //Peticion a la api para traerme informacion sobre el estado fisico del jugador
    const fillEstadoFisico = async () => {
        const data = await fetchData(API_ESTADO_FISICO, 'readAllMobilePlayers')
        if (data.status) {
            let dataEstate = data.dataset;
            setEstadoFisico(dataEstate);
            console.log(estadoFisico);
        } else {
            console.log(data.error);
        }
    }

    //Peticion a la api para traerme informacion sobre el estado fisico del jugador
    const logout = async () => {
        setLogueado(false);
        navigation.navigate('WelcomeScreen');
      };
      

    // Manejo de cierre de sesión
    const handleLogOut = async () => {
        try {
            const data = await fetchData(API_PLAYERS, "logOut");
            if (data.status) {
                setAlertType(1);
                setAlertMessage(`${data.message}`);
                setAlertCallback(() => logout);
                setAlertVisible(true);
            } else {
                setAlertType(2);
                setAlertMessage(`Error sesión: ${data.error}`);
                setAlertCallback(null);
                setAlertVisible(true);
            }
        } catch (error) {
            setAlertType(2);
            setAlertMessage(`Error sesión: ${data.error}`);
            setAlertCallback(null);
            setAlertVisible(true);
        }
    };


    const handleAlertClose = () => {
        setAlertVisible(false);
        if (alertCallback) alertCallback();
    };

    //Peticion a la api para traerme informacion sobre el jugador
    const fillPlayers = async () => {
        const data = await fetchData(API_PLAYERS, 'readOneMobile');
        if (data.status) {
            let dataPlayers = data.dataset;
            setPlayers(dataPlayers)
        } else {
            console.log(data.error)
        }
    }

    // Permite que se llame a la funcion cada vez que cambie el idEquipo, filter o el search
    useFocusEffect(
        useCallback(() => {
            fillPlayers();
            fillEstadoFisico();
        }, [activeSection])
    )

    // Variable que guardará el contenido que se mostrará en la pantalla
    let contentComponent;
    // Evaluamos la opción que se ha elegido y dependiendo de ello inyectará el componente de la información requerida a contentComponent.
    switch (activeSection) {
        case 'informacion':
            contentComponent = <InfoPlayers informationPlayer={players} estadoFisico={estadoFisico} />;
            break;
        default:
            contentComponent = null;
    }

    return (
        <View style={styles.container}>
            {/*HEADER*/}

            <LinearGradient style={styles.linearGradient} colors={['#03045E', '#0608C4']}>
                <Avatar.Image size={120} source={{ uri: `${SERVER_URL}images/jugadores/${players.foto_jugador}` }} />
                <Text style={styles.namePlayer}>{players.nombre_jugador + ' ' + players.apellido_jugador}</Text>
                <Text style={styles.positionPlayer}>{players.posicionPrincipal}</Text>
                <TouchableOpacity onPress={handleLogOut} style={styles.logoutIcon}>
                    <Entypo name="log-out" size={30} color="#FFF" />
                </TouchableOpacity>
            </LinearGradient>

            {/*BUTTONS*/}
            <View style={styles.rowButton}>
                <Chip
                    style={{ backgroundColor: activeChip === 'informacion' ? '#03045E' : '#F2EEEF', }}
                    onPress={() => changeScreen('informacion')}
                    textStyle={{ color: activeChip === 'informacion' ? 'white' : '#9A9A9A' }}>Información
                </Chip>
            </View>
            <AlertComponent
                visible={alertVisible}
                type={alertType}
                message={alertMessage}
                onClose={handleAlertClose}
            />

            {/*INFORMACION SELECCIONADA*/}
            {contentComponent}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    linearGradient: {
        paddingTop: 50,
        paddingBottom: 25,
        flexDirection: "column",
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    logoutIcon: {
        position: "absolute",
        top: 40,
        right: 20,
    },
    namePlayer: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        textAlign: "center"
    },
    positionPlayer: {
        color: 'white',
        fontSize: 20
    },
    rowButton: {
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});

export default ProfileScreen;
