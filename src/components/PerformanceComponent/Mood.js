import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import Fonts from "../../../fonts/fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Mood = () => {
    Fonts();

    return(
        <View>
            <Text style={styles.question}>¿Cómo te sentiste después del partido?</Text>
            <Text style={styles.text1}>Selecciona el emoji con el que te sientes identifcado</Text>
                <View style={styles.row}>
                    <ScrollView horizontal={true}>
                    <TouchableOpacity style={styles.card1}>
                        <Icon name='emoticon-excited' size={50} color={'#eabd03'}/>
                        <Text style={styles.emotion}>Energético</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card2}>
                        <Icon name='emoticon-happy' size={50} color={'#d87309'}/>
                        <Text style={styles.emotion}>Satisfecho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card3}>
                        <Icon name='emoticon-neutral' size={50} color={'#3cd324'}/>
                        <Text style={styles.emotion}>Normal</Text>
                    </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.row2}>
                    <TouchableOpacity style={styles.card4}>
                        <Icon name='emoticon-frown' size={50} color={'#1b5dc1'}/>
                        <Text style={styles.emotion}>Agotado</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card5}>
                        <Icon name='emoticon-sad' size={50} color={'#df2222'}/>
                        <Text style={styles.emotion}>Desanimado</Text>
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
        backgroundColor: '#FFE884',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFB86D',
        padding: 10,
        width: 100,
        borderRadius: 10,
        marginHorizontal: 10
    },
    card3: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#AED7A7',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card4: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#95BBF5',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card5: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FF8585',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    emotion: {
        fontFamily: 'Poppins_300Light',
        fontSize: 12
    }
})
export default Mood;