import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
import Fonts from "../../../fonts/fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useState} from "react";

const Mood = () => {
    Fonts();

    const [selectedCard, setSelectedCard] = useState(null);

    const handleSelectCard = (card) => {
        setSelectedCard(card);
    }

    return(
        <View>
            <Text style={styles.question}>¿Cómo te sentiste después del partido?</Text>
            <Text style={styles.text1}>Selecciona el emoji con el que te sientes identifcado</Text>
                <View style={styles.row}>
                    <ScrollView horizontal={true}>
                    <TouchableOpacity onPress={()=>{handleSelectCard(1)}}>
                        <View style={[styles.card, styles.card1, selectedCard === 1 && styles.selectedCard]}>
                            <Image style={styles.img} source={require('../../../assets/emotions/1.png')}/>
                            <Text style={styles.emotion}>Energético</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{handleSelectCard(2)}}>
                        <View style={[styles.card, styles.card2, selectedCard === 2 && styles.selectedCard]}>
                            <Image style={styles.img} source={require('../../../assets/emotions/2.png')}/>
                            <Text style={styles.emotion}>Satisfecho</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{handleSelectCard(3)}}>
                        <View style={[styles.card, styles.card3, selectedCard === 3 && styles.selectedCard]}>
                            <Image style={styles.img} source={require('../../../assets/emotions/3.png')}/>
                            <Text style={styles.emotion}>Normal</Text>
                        </View>
                    </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.row2}>
                    <TouchableOpacity onPress={()=>{handleSelectCard(4)}}>
                        <View style={[styles.card, styles.card4, selectedCard === 4 && styles.selectedCard]}>
                            <Image style={styles.img} source={require('../../../assets/emotions/4.png')}/>
                            <Text style={styles.emotion}>Agotado</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{handleSelectCard(5)}}>
                       <View style={[styles.card, styles.card5, selectedCard === 5 && styles.selectedCard]}>
                           <Image style={styles.img} source={require('../../../assets/emotions/5.png')}/>
                           <Text style={styles.emotion}>Desanimado</Text>
                       </View>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    question: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18
    },
    text1: {
        fontFamily: 'Poppins_300Light',
        marginBottom: 10
    },
    row: {
        flexDirection: "row",
        gap:9,
        justifyContent: "center"
    },
    row2: {
        marginTop: 10,
        flexDirection: "row",
        gap: 9,
        alignItems: "center",
        marginBottom: 40
    },
    card1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fbda4c',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fb8dbb',
        padding: 10,
        width: 100,
        borderRadius: 10,
        marginHorizontal: 10
    },
    card3: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f1c7f4',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card4: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#aaead6',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card5: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#bad7f8',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    emotion: {
        fontFamily: 'Poppins_300Light',
        fontSize: 12,
        marginTop: -10
    },
    img: {
        width: 100,
        height: 80,
    },
    selectedCard: {
        borderColor: '#777575',
        borderWidth: 2,
    },
})
export default Mood;