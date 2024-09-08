import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TrainingsScreen from "../screens/TrainingsScreen";
import GradesScreen from "../screens/GradesScreen";
import PerformanceDetails from "../screens/PerformanceDetails";
/* import RecoverPasswordScreen from '../screens/ChangePasswordsScreen';
import PlayersScreen from '../screens/PlayersScreen';
import PlayersDetails from "../screens/PlayersDetails";
import AssistsScreen from "../screens/AssistsScreen";
import AssistsScreenM from "../screens/AssistsScreenM";
import TestPlayerScreen from "../screens/TestPlayerScreen";
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
        options={{ headerShown: true }}
      >
        {props => <TrainingsScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
         name='RendimientoDetalle'
         options={{ headerShown: false }}
      >
         {props => <PerformanceDetails {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
