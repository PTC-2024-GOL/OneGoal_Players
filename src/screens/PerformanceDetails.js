import {View, Text, StyleSheet, Dimensions, Image, ScrollView} from "react-native";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {Card, Chip} from "react-native-paper";
import Fonts from "../../fonts/fonts";
import Performance from "../components/PerformanceComponent/Performance";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PerformanceDetails = () => {
    Fonts();
    const [activeChip, setActiveChip] = useState('Rendimiento');
    const navigation = useNavigation();
    const route = useRoute();
    const { idPartido } = route.params;

    useFocusEffect(
        useCallback(()=>{

        },[])
    )

    return(
        <View style={styles.container}>
            <View style={styles.backgroundHeader}>
                <Text style={styles.date}>14 de noviembre de 2024</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Image style={styles.img} source={require('../../assets/gol.png')}/>
                            <Text style={styles.teamName}>Un gol para El Salvador</Text>
                        </View>
                        <View style={styles.col}>
                            <View style={styles.cont1}>
                                <Text style={styles.text1}>Visitante</Text>
                            </View>
                            <Text style={styles.text2}>3:2</Text>
                            <Text style={{marginTop: -10, fontFamily: 'Poppins_500Medium', fontSize: 15, color: '#10b81a'}}>Victoria</Text>
                        </View>
                        <View style={styles.col}>
                            <Image style={styles.img} source={require('../../assets/gol.png')}/>
                            <Text style={styles.rivalName}>Monaco</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.rowButton}>
                <Chip
                    style={{backgroundColor: activeChip === 'Rendimiento' ? '#03045E' : '#03045E',}}
                    textStyle={{color: activeChip === 'Rendimiento' ? 'white' : '#757272', fontFamily: 'Poppins_400Regular'}}>Rendimiento
                </Chip>
                <Chip
                    style={{backgroundColor: activeChip === 'Animo' ? '#03045E' : '#e6e3e3',}}
                    textStyle={{color: activeChip === 'Animo' ? 'white' : '#757272', fontFamily: 'Poppins_400Regular'}}>Estado de ánimo
                </Chip>
            </View>
            <ScrollView style={styles.scroll}>
                <Performance/>
            </ScrollView>
        </View>
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
    card: {
        position:"absolute",
        zIndex: 2,
        top: 110,
        left: width * 0.05,
        right: width * 0.05,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 10
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    col: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    date: {
        marginTop: 60,
        textAlign: "center",
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
        fontSize: 18
    },
    img: {
        width: 80,
        height: 80,
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
        marginTop: 105,
        marginBottom: 20,
        flexDirection: "row",
        gap: 20,
        justifyContent: "center"
    },
    scroll: {
        marginHorizontal: 25
    },
});

export default PerformanceDetails;