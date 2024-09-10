import {View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity} from "react-native";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {Card, Chip} from "react-native-paper";
import Fonts from "../../fonts/fonts";
import Performance from "../components/PerformanceComponent/Performance";
import {SERVER_URL} from "../../api/constantes";
import Mood from "../components/PerformanceComponent/Mood";
import fetchData from "../../api/components";
import LoadingComponent from "../components/LoadingComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {AlertNotificationRoot} from "react-native-alert-notification";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PerformanceDetails = () => {
    Fonts();
    const [activeChip, setActiveChip] = useState('Rendimiento');
    const [activeSection, setActiveSection] = useState('Rendimiento');
    const [performanceData, setPerformanceData] = useState([]);
    const [MoodData, setMoodData] = useState([]);
    const [goles, setGoles] = useState([]);
    const [yellowCard, setYellowCard] = useState(0);
    const [redCard, setRedCard] = useState(0);
    const navigation = useNavigation();
    const route = useRoute();
    const { data } = route.params;
    let idJugador = data.id_jugador;
    let idPartido = data.id_partido;
    let idParticipacion = performanceData.id_participacion;
    const [load, setLoad] = useState(false);

    // URL de la API para participaciones
    const PARTICIPATION_API = 'services/players/participaciones_partidos.php';
    const GOLES_API = 'services/players/detalles_goles.php';
    const AMONESTACIONES_API = 'services/players/detalles_amonestaciones.php';

    const fillParticipationDetail = async () => {
        const form = new FormData();
        form.append('idPartido', idPartido);
        form.append('idJugador', idJugador);

        const data = await fetchData(PARTICIPATION_API, 'readOne', form);

        if(data.status) {
            setPerformanceData(data.dataset);
        }else {
            console.log(data.error)
        }
    }

    const changeComponents = (section) => {
        // Manejo para el cambio de pantalla
        setActiveSection(section);
        // Manejo para el estilo de los chips
        setActiveChip(section);
    };

    const fillGoles = async () => {
        const form = new FormData();
        form.append('idParticipacion', performanceData.id_participacion);

        const data = await fetchData(GOLES_API, 'readAllByIdParticipacion', form);
        if(data.status){
            setGoles(data.dataset);
        }else {
            setGoles(0)
            console.log(data.error);
        }
    }

    const fillYellowCards = async () => {
        const form = new FormData();
        form.append('idParticipacion', performanceData.id_participacion);

        const data = await fetchData(AMONESTACIONES_API, 'readTarjetaAmarillas', form);

        if(data.status){
            setYellowCard(data.dataset);
        }else{
            console.log(data.error)
        }
    }

    const fillRedCards = async () => {
        const form = new FormData();
        form.append('idParticipacion', performanceData.id_participacion);

        const data = await fetchData(AMONESTACIONES_API, 'readTarjetaRojas', form);

        if(data.status){
            setRedCard(data.dataset);
        }else{
            console.log(data.error)
        }
    }

    const goToMatches = () => {
        navigation.goBack();
    }

    useFocusEffect(
        useCallback(()=>{
            const callApis = async () => {
                setLoad(false);

                await fillParticipationDetail();
                await fillGoles();
                await fillYellowCards();
                await fillRedCards();

                setLoad(true);
            }
            callApis();
        },[activeSection, idPartido, idParticipacion])
    )

    //Manejo para el cambio de sub pantallas
    let component;
    if (activeSection === 'Rendimiento') {
        component = <Performance player={performanceData} goles={goles} redCard={redCard} yellowCard={yellowCard}/>
    } else {
        component = <Mood mood={performanceData.estado_animo} idParticipation={performanceData.id_participacion}/>
    }

    let color;
    let result = data.tipo_resultado_partido;
    switch(result){
        case 'Victoria':
            color = '#10b81a';
            break;
        case 'Pendiente':
            color = '#d8b41d';
            break
        case 'Derrota':
            color = '#e60404';
            break;
        case 'Empate':
            color = '#d86628'
            break;
    }

    return(
        <AlertNotificationRoot>
            <View style={styles.container}>
                <View style={styles.backgroundHeader}>
                    <TouchableOpacity style={styles.rowBackButton} onPress={goToMatches}>
                        <Icon name='arrow-left-drop-circle' size={40} color='#fff'/>
                    </TouchableOpacity>
                    <Text style={styles.date}>{data.fecha}</Text>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View style={styles.col}>
                                <Image style={styles.img} source={{uri: `${SERVER_URL}images/equipos/${data.logo_equipo}`}}/>
                                <Text style={styles.teamName}>{data.nombre_equipo}</Text>
                            </View>
                            <View style={styles.col}>
                                <View style={styles.cont1}>
                                    <Text style={styles.text1}>{data.localidad_partido}</Text>
                                </View>
                                <Text style={styles.text2}>{data.resultado_partido}</Text>
                                <Text style={{marginTop: -10, fontFamily: 'Poppins_500Medium', fontSize: 15, color: color}}>{data.tipo_resultado_partido}</Text>
                            </View>
                            <View style={styles.col}>
                                <Image style={styles.img} source={{uri: `${SERVER_URL}images/rivales/${data.logo_rival}`}}/>
                                <Text style={styles.rivalName}>{data.nombre_rival}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.rowButton}>
                    <Chip
                        onPress={() => changeComponents('Rendimiento')}
                        style={{backgroundColor: activeChip === 'Rendimiento' ? '#03045E' : '#e6e3e3',}}
                        textStyle={{color: activeChip === 'Rendimiento' ? 'white' : '#757272', fontFamily: 'Poppins_400Regular'}}>Rendimiento
                    </Chip>
                    <Chip
                        onPress={() => changeComponents('Animo')}
                        style={{backgroundColor: activeChip === 'Animo' ? '#03045E' : '#e6e3e3',}}
                        textStyle={{color: activeChip === 'Animo' ? 'white' : '#757272', fontFamily: 'Poppins_400Regular'}}>Estado de ánimo
                    </Chip>
                </View>
                <ScrollView style={styles.scroll}>
                    {
                        load ? (
                            component
                        ): (
                            <LoadingComponent />
                        )
                    }
                </ScrollView>
            </View>
        </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 100
    },
    backgroundHeader: {
        backgroundColor: '#334195',
        height: 200
    },
    rowBackButton: {
      flexDirection: "row",
        padding: 10,
        marginTop: 20,
        marginStart: 8
    },
    card: {
        position:"absolute",
        zIndex: 2,
        top: 110,
        left: width * 0.05,
        right: width * 0.05,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 10,
        height: height * 0.2,
        display: "flex",
        justifyContent: "center"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    col: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    date: {
        marginTop: -10,
        textAlign: "center",
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
        fontSize: 18
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 100
    },
    rivalName: {
        marginTop: 10,
        width: 100,
        fontFamily: 'Poppins_400Regular',
        textAlign: "center",
    },
    teamName: {
        marginTop: 10,
        width: 100,
        fontFamily: 'Poppins_400Regular',
        textAlign: "center"
    },
    cont1: {
        borderWidth: 2,
        borderColor: '#bfc1bd',
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    text1: {
        fontFamily: 'Poppins_400Regular',
        color: '#aaaca8',
        fontSize: 12
    },
    text2: {
        fontSize: 40,
        fontFamily: 'Poppins_600SemiBold',
    },
    rowButton: {
        marginTop: height * 0.12,
        marginBottom: 25,
        flexDirection: "row",
        gap: 20,
        justifyContent: "center"
    },
    scroll: {
        marginHorizontal: 25,
    },
});

export default PerformanceDetails;