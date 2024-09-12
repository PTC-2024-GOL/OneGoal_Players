import {useNavigation} from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image, Dimensions, ScrollView,
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
          <ScrollView>
              <View style={styles.container}>
                  <Image
                      source={require('../../assets/welcomeImg.png')}
                      style={styles.image}
                  />
              </View>
              <View style={styles.containerText}>
                  <Text style={styles.title}>Un gol para El Salvador</Text>
                  <Text style={styles.textContent}>Lleva el control de tus entrenos y partidos diariamente</Text>
              </View>
              <TouchableOpacity  onPress={() => (navigation.navigate('LoginScreen'))}>
                  <View style={styles.button}>
                      <View style={styles.row}>
                          <Text style={styles.buttonText}>Empezar</Text>
                      </View>
                  </View>
              </TouchableOpacity>
          </ScrollView>
      </LinearGradient>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3235b6',
        padding: 15,
        borderRadius: 10,
        marginTop: 40,
        marginHorizontal: 20,
        marginBottom: 35
    },
    linearGradient: {
        flex: 1
    },
    image: {
        height: height * 0.7,
        width: '100%',
        borderRadius: 30
    },
    title: {
        fontSize: 28,
        color: 'white',
        fontFamily: 'Poppins_600SemiBold'
    },
    textContent: {

        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins_400Regular'
    },
    containerText:{
        marginHorizontal: 20,
        marginTop: 20
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