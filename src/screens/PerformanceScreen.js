import { useNavigation } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image, Dimensions,
} from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";

const width = Dimensions.get('window').width;

const PerformanceScreen = ({ logueado, setLogueado }) => {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#090BA0', '#03043A']} style={styles.linearGradient}>
            <View style={styles.containerText}>
                <Text style={styles.title}>Revisa tu rendimiento durante la temporada</Text>
                <Text style={styles.textContent}>Rendimiento</Text>
            </View>
        </LinearGradient>
    )
}

export default PerformanceScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: null,
        height: 450
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 25,
        width: 180,
        marginTop: 40,
        marginHorizontal: 20,
    },
    linearGradient: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        aspectRatio: width * 0.003,
        borderRadius: 30
    },
    title: {
        fontSize: 30,
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold'
    },
    textContent: {
        marginTop: 10,
        color: 'white',
        fontSize: 14,
        fontWeight: 'ultralight'
    },
    containerText: {
        marginHorizontal: 20
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }
})