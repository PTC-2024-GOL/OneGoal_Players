import {useNavigation} from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image, Dimensions,
} from 'react-native';
import { Text} from 'react-native-paper';
import {LinearGradient} from "expo-linear-gradient";
import Fonts from "../../fonts/fonts";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const WelcomeScreen = () => {
  //Utilizamos nuestras fuentes - Para saber como se llaman las fuentes, revisar fonts.js
  Fonts();
  const navigation = useNavigation();

  return(
      <LinearGradient colors={['#185AAE', '#185AAE']} style={styles.linearGradient}>
          <View style={styles.container}>
              <Image
                  source={require('../../assets/welcomeImg.png')}
                  style={styles.image}
              />
          </View>
          <View style={styles.row}>
              <Image style={styles.icon} source={require('../../assets/gol_blanco 2.png')}/>
          </View>
          <View style={styles.containerText}>
              <Text style={styles.title}>Un gol para El Salvador</Text>
              <Text style={styles.textContent}>Lleva el control de tus entrenos y partidos diariamente</Text>
          </View>
          <TouchableOpacity  onPress={() => (navigation.navigate('LoginScreen'))}>
              <LinearGradient colors={['#5A71FF', '#1A2462']} style={styles.button}>
                  <View style={styles.row}>
                      <Text style={styles.buttonText}>Empezar</Text>
                  </View>
              </LinearGradient>
          </TouchableOpacity>
      </LinearGradient>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: null,
        height: 450
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginTop: height * 0.05,
        marginHorizontal: 20,
    },
    linearGradient: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        aspectRatio: width * 0.003,
        borderBottomLeftRadius: 140,
        borderBottomRightRadius: 140,
        borderRadius: 30
    },
    title: {
        fontSize: 30,
        color: 'white',
        marginTop: 5,
        fontFamily: 'Poppins_600SemiBold'
    },
    textContent: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins_400Regular'
    },
    containerText:{
        marginHorizontal: 20
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins_500Medium'
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    icon : {
        width: 150,
        height: 150
    }
})