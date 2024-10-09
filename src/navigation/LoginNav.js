import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Importar íconos si lo deseas
import { TouchableOpacity } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TrainingsScreen from "../screens/TrainingsScreen";
import GradesScreen from "../screens/GradesScreen";
import PerformanceDetails from "../screens/PerformanceDetails";
import ProfileScreen from "../screens/ProfileScreen";
import TestPlayerScreen from "../screens/TestPlayerScreen";
import SearchScreen from "../screens/SearchScreen";
import RecapScreen from "../screens/RecapScreen";
/* import RecoverPasswordScreen from '../screens/ChangePasswordsScreen';
import PlayersScreen from '../screens/PlayersScreen';
import PlayersDetails from "../screens/PlayersDetails";
import AssistsScreen from "../screens/AssistsScreen";
import AssistsScreenM from "../screens/AssistsScreenM";
import PlayerAnalysis from "../screens/PlayerAnalysis"; */

const Stack = createStackNavigator();

export default function LoginNav({ logueado, setLogueado }) {
  return (
    <Stack.Navigator
      initialRouteName='WelcomeScreen'
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#0078B7',
          borderBottomRightRadius: 35,
          borderBottomLeftRadius: 35,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      })}>

      <Stack.Screen
        name='LoginScreen'
        options={{ headerShown: false }}
      >
        {props => <LoginScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
        name='WelcomeScreen'
        options={{ headerShown: false }}
        component={WelcomeScreen}>
      </Stack.Screen>
      <Stack.Screen
         name='Calificaciones'
         options={{headerShown: true}}
      >
        {props => <GradesScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
        name='Entrenamientos'
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      >
        {props => <TrainingsScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
        name='Profile'
        options={{ headerShown: false }}
        
      >
        {props => <ProfileScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
         name='RendimientoDetalle'
         options={{ headerShown: false }}
      >
         {props => <PerformanceDetails {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
         name='Buscar'
         options={{ headerShown: true }}
      >
         {props => <SearchScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
         name='RECAP'
         options={{ headerShown: false }}
      >
         {props => <RecapScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
         name='Notas'
         options={{
            headerShown: true,
            headerStyle: {
                backgroundColor: '#0078B7', // Nuevo color de fondo para la pantalla de asistencias
                borderBottomRightRadius: 35,
                borderBottomLeftRadius: 35,
            },
         }}
      >
        {props => <TestPlayerScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
