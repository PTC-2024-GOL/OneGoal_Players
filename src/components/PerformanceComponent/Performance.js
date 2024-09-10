import {Text, View, StyleSheet, Dimensions, ScrollView, Image} from "react-native";
import Fonts from "../../../fonts/fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useFocusEffect} from "@react-navigation/native";
import {useCallback} from "react";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Performance = ({player, goles, redCard, yellowCard}) => {
    Fonts();

    let juego;
    if(player.titular === '1') {
       juego = 'Titular'
    } else {
        juego ='Suplente'
    }

    return(
        <View>
            <View style={styles.rowContainer}>
                <View style={styles.circle}></View>
                <Text style={{fontFamily: 'Poppins_500Medium'}}>{juego}</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.bigCircle}>
                    <Text style={styles.note}>{player.puntuacion}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Icon name="clipboard-text-outline" size={20}/>
                <Text style={{fontFamily: 'Poppins_300Light'}}>Tú puntuación en el partido</Text>
            </View>
            <View style={styles.rowCard}>
                <ScrollView horizontal={true}>
                    <View style={styles.card1}>
                        <Icon name='soccer' size={30} color={'#fff'}/>
                        <View style={styles.col}>
                            <Text style={styles.title1}>{player.goles}</Text>
                            <Text style={styles.text1}>Goles</Text>
                        </View>
                    </View>
                    <View style={styles.card2}>
                        <Icon name='clock-time-four-outline' size={30} color={'#fff'}/>
                        <View style={styles.col}>
                            <Text style={styles.title1}>{player.minutos_jugados}</Text>
                            <Text style={styles.text1}>Minutos jugados</Text>
                        </View>
                    </View>
                    <View style={styles.card3}>
                        <Icon name='account-check-outline' size={30} color={'#fff'}/>
                        <View style={styles.col}>
                            <Text style={styles.title1}>{player.asistencias}</Text>
                            <Text style={styles.text1}>Asistencias</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Text style={styles.card}>Tarjetas asignadas</Text>
            <View style={styles.rowContainer}>
                <Icon name="cards" size={30} color={'#e60404'}/>
                {
                    redCard.totalRojas > 0 ? (
                        <Text style={styles.cardText}>Tuviste {redCard.totalRojas} tarjeta/s roja/s</Text>
                    ):(
                        <Text style={styles.cardText}>No tuviste ninguna tarjeta roja</Text>
                    )
                }
            </View>
            <View style={styles.rowContainer}>
                <Icon name="cards" size={30} color={'#f8d852'}/>
                {
                    yellowCard.totalAmarillas > 0 ? (
                        <Text style={styles.cardText}>Tuviste {yellowCard.totalAmarillas} tarjeta/s amarilla/s </Text>
                    ):(
                        <Text style={styles.cardText}>No tuviste ninguna tarjeta amarilla</Text>
                    )
                }
            </View>
            <Text style={styles.cardGol}>Tipos de goles</Text>
            <View style={styles.rowContainerGol}>
                <Icon name="soccer" size={30}/>
                {
                    goles ? (
                        goles.map((item) => (
                            <Text style={styles.cardText}>{item.cantidad_tipo_gol} {item.nombre_tipo_gol}</Text>
                        ))
                    ): (
                        <Text style={styles.cardText}>No tuviste goles en este partido</Text>
                    )
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    circle: {
        width: 10,
        height: 10,
        backgroundColor: '#EF7301',
        borderRadius: 100/2
    },
    rowContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8
    },
    bigCircle: {
        backgroundColor:'#EDF2FB',
        borderRadius: 100,
        height: 100,
        width: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    note: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 25,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginTop: 10
    },
    card1: {
        width: 140,
        padding: 10,
        backgroundColor: '#5E50FD',
        borderRadius: 10
    },
    card2: {
        width: 140,
        padding: 10,
        backgroundColor: '#AC74F2',
        marginHorizontal: 10,
        borderRadius: 10
    },
    card3: {
        width: 140,
        padding: 10,
        backgroundColor: '#5E50FD',
        borderRadius: 10
    },
    col: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: -10
    },
    rowCard: {
        marginTop: 20,
        marginBottom: 10
    },
    title1:{
        color: '#fff',
        fontFamily: 'Poppins_500Medium',
        fontSize: 35
    },
    text1: {
        color: '#fff',
        fontFamily: 'Poppins_300Light',
        marginTop: -10
    },
    card: {
        fontFamily: 'Poppins_500Medium',
        marginBottom: 10,
        marginTop: 10
    },
    cardText: {
        fontFamily: 'Poppins_400Regular',
        marginBottom: 10
    },
    cardGol: {
        fontFamily: 'Poppins_500Medium',
        marginBottom: 10,
        marginTop: 15
    },
    rowContainerGol: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
        marginBottom: 30
    },
})
export default Performance;