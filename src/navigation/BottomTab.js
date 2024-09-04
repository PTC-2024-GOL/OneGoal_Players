import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import PerformanceScreen from '../screens/PerformanceScreen';
import JourneysScreen from '../screens/JourneysScreen';
import PaymentScreen from '../screens/PaymentScreen';
import MedicalHistory from '../screens/MedicalHistory';
import LoginNav from '../navigation/LoginNav';
import CustomTabLabel from './CustomTabLabel';

// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

export default function BottomTab({ logueado, setLogueado }) {
    // Función para renderizar HomeScreen con props
    const RenderHomeScreen = props => (
        <HomeScreen {...props} setLogueado={setLogueado} logueado={logueado} />
    );
    // Función para renderizar HomeScreen con props
    const RenderJourneysScreen = props => (
        <JourneysScreen {...props} setLogueado={setLogueado} logueado={logueado} />
    );
    // Función para renderizar HomeScreen con props
    const RenderPerformanceScreen = props => (
        <PerformanceScreen {...props} setLogueado={setLogueado} logueado={logueado} />
    );
    // Función para renderizar HomeScreen con props
    const RenderPaymentScreen = props => (
        <PaymentScreen {...props} setLogueado={setLogueado} logueado={logueado} />
    );
    // Función para renderizar HomeScreen con props
    const RenderMedicalHistory = props => (
        <MedicalHistory {...props} setLogueado={setLogueado} logueado={logueado} />
    );
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Inicio') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Rendimiento') {
                        iconName = focused ? 'football' : 'football-outline';
                    } else if (route.name === 'Jornadas') {
                        iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
                    } else if (route.name === 'Medico') {
                        iconName = focused ? 'bag-add' : 'bag-add-outline';
                    } else if (route.name === 'Pagos') {
                        iconName = focused ? 'cash' : 'cash-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarLabel: ({ focused, color }) => {
                    let labelText = route.name;
                    if (route.name === 'Medico') {
                        labelText = 'Historial médico';
                    } else if (route.name === 'Pagos') {
                        labelText = 'Historial de pagos';
                    }
        
                    return <CustomTabLabel text={labelText} />;
                },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#eee',
                tabBarStyle: styles.tabBar,
                headerStyle: {
                    backgroundColor: '#0078B7',
                    borderBottomRightRadius: 35,
                    borderBottomLeftRadius: 35,
                },
                headerTintColor: '#fff',
                tabBarLabelStyle: styles.tabBarLabel,
                headerTitleAlign: 'center',
            })}
        >
            <Tab.Screen
                name="Rendimiento"
                component={RenderPerformanceScreen}
                options={{
                    title: 'Rendimiento',
                }}
            />
            <Tab.Screen
                name="Jornadas"
                component={RenderJourneysScreen}
                options={{
                    title: 'Jornadas'
                }}
            />
            <Tab.Screen
                name="Inicio"
                component={RenderHomeScreen}
                options={{
                    title: 'Inicio',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Medico"
                component={RenderMedicalHistory}
                options={{
                    title: 'Historial medico',
                }}
            />
            <Tab.Screen
                name="Pagos"
                component={RenderPaymentScreen}
                options={{
                    title: 'Historial de pagos',
                }}
            />
            {/*Pantalla fuera del BottomTab*/}
            {/*Accedemos al Stack navigation que se encuentra en LoginNav  */}
            <Tab.Screen
                name="LoginNav"
                component={LoginNav}
                //Escondemos la opcion para que no aparezca en el BottomTab
                options={({ route }) => ({
                    tabBarButton: () => null,
                    headerShown: false
                })}
            />
        </Tab.Navigator>
    );
}

const CustomTabBarButton = ({ children, onPress }) => (
    <View style={styles.customButtonContainer}>
        <View style={styles.customButton}>
            <TouchableOpacity
                style={styles.customButtonTouchable}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#03045E',
        borderRadius: 15,
        height: 80,
        padding: 10,
        paddingBottom: 15,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    customButtonContainer: {
        top: -16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#000080',
        padding: 10
    },
    customButtonTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000080',
        borderRadius: 35,
    },
    customButtonIcon: {
        color: '#FFC300',
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});
