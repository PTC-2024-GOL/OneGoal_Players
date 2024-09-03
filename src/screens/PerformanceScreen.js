import { useNavigation } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image, Dimensions,
} from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import fetchData from '../../api/components';
import Entypo from "@expo/vector-icons/Entypo";

const width = Dimensions.get('window').width;

const PerformanceScreen = ({ logueado, setLogueado }) => {
    // URL de la API para el usuario
    const USER_API = 'services/players/jugadores.php';
    // Manejo de cierre de sesión
    const handleLogOut = async () => {
        try {
            const data = await fetchData(USER_API, 'logOut');
            if (data.status) {
                setLogueado(false);
            } else {
                Alert.alert('Error sesión', data.error);
            }
        } catch (error) {
            console.log('Error: ', error);
            Alert.alert('Error sesión', error);
        }
    };
    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#EEEEEE', '#F2F7FF']} style={styles.linearGradient}>
            <View style={styles.containerText}>
                <Text style={styles.title}>Revisa tu rendimiento durante la temporada</Text>
                <Text style={styles.textContent}>Rendimiento</Text>
            </View>
            <View style={styles.containerText}>
                <TouchableOpacity onPress={handleLogOut} style={styles.logoutIcon}>
                    <Entypo name="log-out" size={30} color="#000" />
                </TouchableOpacity>
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
        color: 'black',
        marginTop: 15,
        fontWeight: 'bold'
    },
    textContent: {
        marginTop: 10,
        color: 'black',
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