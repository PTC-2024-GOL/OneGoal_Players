import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { TextInput, DefaultTheme, Provider as PaperProvider, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import fetchData from '../../api/components';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

// Importa la imagen de fondo y el logo
import background from '../../assets/background.png';
import logo from '../../assets/gol_blanco 2.png';
import {AlertNotificationRoot} from "react-native-alert-notification";
import {DialogNotification, ToastNotification} from "../components/Alerts/AlertComponent";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
// Define un tema personalizado
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'white',
    primary: 'white',
    placeholder: 'white',
    background: 'transparent',
  },
};

const LoginScreen = ({ logueado, setLogueado }) => {
  // Estados para los campos de alias y clave
  const [alias, setAlias] = useState('');
  const [clave, setClave] = useState('');

  // URL de la API para el usuario
  const USER_API = 'services/players/jugadores.php';

  const navigation = useNavigation(); // Obtiene el objeto de navegación

  // Manejo de inicio de sesión
  const handleLogin = async () => {
    
    // Verifica que los campos no estén vacíos
    if (!alias || !clave) {
      ToastNotification(2, `Campos requeridos, Por favor, complete todos los campos.`, true);
      return;
    } else {
      // Creación del formulario para la petición
      const formData = new FormData();
      formData.append('correo', alias);
      formData.append('clave', clave);
  
      try {
        // Realización de la petición de inicio de sesión
        const data = await fetchData(USER_API, 'logIn', formData);
        if (data.status) {
          DialogNotification(1, data.message, 'Aceptar', goToHome)
        } else {
          ToastNotification(2, data.error, true);
        }
      } catch (error) {
        console.log('Error: ', error);
          ToastNotification(3, 'No se encontró ningún usuario', true);
      }
    }
  };

  const goToHome = () => {
      setLogueado(!logueado)
  }

  return (
    <AlertNotificationRoot>
      <PaperProvider theme={theme}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.overlay}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.logInText}>Inicio de sesión</Text>
            <TextInput
                placeholder='Correo electrónico'
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                underlineColor="transparent"
                mode="flat"
                selectionColor="white"
                placeholderTextColor="white"
                textColor='#ffffff'
                value={alias}
                onChangeText={setAlias}
                cursorColor='white'
                theme={{ colors: { primary: 'white', placeholder: 'white', text: 'white', background: 'transparent' } }}
                labelStyle={{ color: 'white' }}
            />
            <TextInput
                placeholder='Contraseña'
                style={styles.input}
                secureTextEntry
                underlineColor="transparent"
                mode="flat"
                selectionColor="white"
                placeholderTextColor="white"
                textColor='#ffffff'
                value={clave}
                onChangeText={setClave}
                cursorColor='white'
                theme={{ colors: { primary: 'white', placeholder: 'white', text: 'white', background: 'transparent' } }}
                labelStyle={{ color: 'white' }} // Estilo personalizado para el label
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <LinearGradient
                  colors={['#354AC8', '#1A2462']}
                  style={styles.gradient}
              >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </PaperProvider>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay con transparencia
  },
  logo: {
    width: 150, // Ajusta el tamaño del logo según tus necesidades
    height: 150,
    alignSelf: 'center',
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent', // Hace el fondo del input transparente
    borderBottomStartRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'semibold',
    fontSize: 16,
    width: windowWidth * 0.35,
    textAlign: "center"
  },
  forgotPassword: {
    marginTop: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'semibold',
    fontSize: 15
  },
  logInText: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
    marginTop: -10,
    fontSize: 16
  }
});

export default LoginScreen;
