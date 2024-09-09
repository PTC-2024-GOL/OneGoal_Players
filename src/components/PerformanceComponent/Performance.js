import {Text, View, StyleSheet, Dimensions, ScrollView} from "react-native";
import Fonts from "../../../fonts/fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Performance = () => {
    Fonts();
    return(
        <View>
            <View style={styles.rowContainer}>
                <View style={styles.circle}></View>
                <Text style={{fontFamily: 'Poppins_500Medium'}}>Titular</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.note}>9.5</Text>
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
                            <Text style={styles.title1}>2</Text>
                            <Text style={styles.text1}>Goles</Text>
                        </View>
                    </View>
                    <View style={styles.card2}>
                        <Icon name='clock-time-four-outline' size={30} color={'#fff'}/>
                        <View style={styles.col}>
                            <Text style={styles.title1}>25</Text>
                            <Text style={styles.text1}>Minutos jugados</Text>
                        </View>
                    </View>
                    <View style={styles.card3}>
                        <Icon name='account-check-outline' size={30} color={'#fff'}/>
                        <View style={styles.col}>
                            <Text style={styles.title1}>2</Text>
                            <Text style={styles.text1}>Asistencias</Text>
                        </View>
                    </View>
                </ScrollView>
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
    note: {
        backgroundColor:'#EDF2FB',
        padding: 20,
        borderRadius: 100/2,
        fontFamily: 'Poppins_500Medium',
        fontSize: 30
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginTop: 10
    },
    card1: {
        width: 150,
        padding: 10,
        backgroundColor: '#5E50FD',
        borderRadius: 10
    },
    card2: {
        width: 150,
        padding: 10,
        backgroundColor: '#AC74F2',
        marginHorizontal: 10,
        borderRadius: 10
    },
    card3: {
        width: 150,
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
        marginBottom: 20
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
    }
})
export default Performance;