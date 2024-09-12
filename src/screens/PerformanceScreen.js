import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image, Dimensions, ScrollView,
} from 'react-native';
import {Chip, Text} from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import fetchData from '../../api/components';
import Fonts from "../../fonts/fonts";
import {useCallback, useState} from "react";
import MatchesCard from "../components/Cards/MatchesCard";
import {SERVER_URL} from "../../api/constantes";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PerformanceScreen = ({ logueado, setLogueado }) => {
    Fonts();
    const [activeChip, setActiveChip] = useState('Recientes');
    const [activeSection, setActiveSection] = useState('Recientes');
    const [matches, setMatches] = useState([]);
    const [data, setData] = useState(false);
    // URL de la API para el usuario
    const USER_API = 'services/players/partidos.php';
    const navigation = useNavigation();

    const changeScreen = (section) => {
        // Manejo para el cambio de pantalla
        setActiveSection(section);
        // Manejo para el estilo de los chips
        setActiveChip(section);
    };

    const fillNewMatches = async () => {
        try{
            const data = await fetchData(USER_API, 'readAllByIdJugadorNew');
            if(data.status) {
                const info = data.dataset;
                setMatches(info);
                setData(true)
            }else{
                console.log(data.error)
                setData(false)
            }
        }catch (e){
            console.log(e)
        }
    }

    const fillOldMatches = async () => {
        try{
            const data = await fetchData(USER_API, 'readAllByIdJugadorOld');
            if(data.status) {
                const info = data.dataset;
                setMatches(info);
                setData(true)
            }else{
                console.log(data.error)
                setData(false)
            }
        }catch (e){
            console.log(e)
        }
    }

    const filter = async () => {
        if(activeChip === 'Recientes') {
           await fillNewMatches();
        }else{
           await fillOldMatches();
        }
    }

    const goToPerformanceDetails = (data) => {
        navigation.navigate('LoginNav', {
            screen: 'RendimientoDetalle',
            params: {data}
        });
    };

    useFocusEffect(
        useCallback(()=>{
            filter()
        },[activeChip])
    )

    return (
        <View style={styles.globalContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Tus partidos jugados</Text>
                <View style={styles.row}>
                    <Image style={{width: 25, height: 25}} source={require('../../assets/icons/soccerBall.png')}/>
                    <Text style={styles.textContent}>Selecciona el partido del que quieres ver
                        tu rendimiento.</Text>
                </View>
                {/*BUTTONS*/}
                <View style={styles.rowButton}>
                    <Chip
                        onPress={() => changeScreen('Recientes')}
                        style={{backgroundColor: activeChip === 'Recientes' ? '#334195' : '#E4E0E1',}}
                        textStyle={{color: activeChip === 'Recientes' ? 'white' : '#9A9A9A', fontFamily: 'Poppins_400Regular'}}>Recientes
                    </Chip>
                    <Chip
                        onPress={() => changeScreen('Antiguos')}
                        style={{backgroundColor: activeChip === 'Antiguos' ? '#334195' : '#E4E0E1',}}
                        textStyle={{color: activeChip === 'Antiguos' ? 'white' : '#9A9A9A', fontFamily: 'Poppins_400Regular'}}>Antiguos
                    </Chip>
                </View>
                <View style={styles.line}></View>
                <ScrollView>
                    <View style={styles.cardsContainer}>
                        {
                            data  ? (
                                matches.map((item, index) => (
                                    <MatchesCard
                                        key={index}
                                        data={item}
                                        teamImg={`${SERVER_URL}images/equipos/${item.logo_equipo}`}
                                        rivalImg={`${SERVER_URL}images/rivales/${item.logo_rival}`}
                                        goToScreen={goToPerformanceDetails}
                                    />
                                ))
                            ) : (
                                <View>
                                    <Text>Aún no has tenido partidos</Text>
                                </View>
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default PerformanceScreen;

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
    }
})