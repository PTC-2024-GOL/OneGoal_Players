import { useNavigation } from '@react-navigation/native';
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
import {useState} from "react";
import MatchesCard from "../components/Cards/MatchesCard";

const width = Dimensions.get('window').width;

const PerformanceScreen = ({ logueado, setLogueado }) => {
    Fonts();
    const [activeChip, setActiveChip] = useState('Recientes');
    // URL de la API para el usuario
    const USER_API = 'services/players/jugadores.php';

    const navigation = useNavigation();

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
                        style={{backgroundColor: activeChip === 'Recientes' ? '#334195' : '#E4E0E1',}}
                        textStyle={{color: activeChip === 'Recientes' ? 'white' : '#9A9A9A', fontFamily: 'Poppins_400Regular'}}>Recientes
                    </Chip>
                    <Chip
                        style={{backgroundColor: activeChip === 'Antiguos' ? '#334195' : '#E4E0E1',}}
                        textStyle={{color: activeChip === 'Antiguos' ? 'white' : '#9A9A9A', fontFamily: 'Poppins_400Regular'}}>Antiguos
                    </Chip>
                </View>
                <View style={styles.line}></View>
                <ScrollView>
                    <View style={styles.cardsContainer}>
                        <MatchesCard/>
                        <MatchesCard/>
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
        marginBottom: 50,

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