import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo, MaterialIcons, Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'; // Importa múltiples librerías de iconos
import Chip from '../Chip/Chip';
import fetchData from '../../../api/components';
const { width, height } = Dimensions.get('window');

const NotificationsModal = ({ modalVisible, setModalVisible }) => {

    const API = "services/players/notificaciones.php";
    const [selectedTab, setSelectedTab] = useState('todas');
    const [notifications, setNotifications] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation(); // Obtiene el objeto de navegación
    const closeModal = () => {
        setSelectedTab('Todas');
        setModalVisible(false); // Cerrar el modal
    };

    // Función para obtener las notificaciones
    const fetchNotifications = async (filterForm = null) => {
        try {
            const action = filterForm ? "filterNotis" : "readMyNotis";
            const data = await fetchData(API, action, filterForm);
            if (data.status === 1) {
                const registros = data.dataset.map((item) => ({
                    title: item.TITULO,
                    id: item.ID,
                    message: item.MENSAJE,
                    date: item.FECHA,
                    type: `${item.TIPO}`,
                    view: item.VISTO,
                    evento: item.EVENTO,
                }));
                setNotifications(registros);
            } else {
                console.log(data.error);
                setNotifications([]);
            }
        } catch (error) {
            console.log('Error trayendo las notificaciones:', error);
        } finally {
            console.log(notifications);
        }
    };


    useEffect(() => {
        fetchNotifications();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchNotifications();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchNotifications().finally(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        if (selectedTab == "Registro medico" || selectedTab == "Test"
            || selectedTab == "Entrenamiento" || selectedTab == "Eventos"
            || selectedTab == "Partido"
        ) {
            const formData = new FormData();
            formData.append("tipo", selectedTab);
            fetchNotifications(formData);
        } else {
            fetchNotifications();
        }
    }, [selectedTab]);

    // Función para abrir el modal y marcar como vista la notificación
    const openNotification = async (item) => {
        // Aquí podrías hacer una petición a tu API para marcar la notificación como vista
        if (item.view === "0") {
            const formData = new FormData();
            formData.append("id", item.id);
            await fetchData(API, "markAsRead", formData);
            fetchNotifications();  // Refresca las notificaciones para reflejar el cambio
            if (item.type === "Registro medico") {
                closeModal();
                navigation.navigate('Medico');
            } else if (item.type === "Test") {
                closeModal();
            } else if (item.type === "Entrenamiento") {
                if (item.title === "Nuevo entrenamiento programado") {
                    closeModal();
                    navigation.navigate('LoginNav', {
                        screen: 'Entrenamientos',
                        params: { idJornada: item.evento }
                    });
                } else {

                    closeModal();
                }
            } else if (item.type === "Eventos") {
                if(item.title === "Tu recap mensual está listo"){
                    closeModal();
                    navigation.navigate('LoginNav', {
                        screen: 'RECAP',
                    });
                }else if(item.title === "Feliz Cumpleaños"){
                    closeModal();
                }else if(item.title === "Convocatoria para el partido"){
                    closeModal();
                }
            } else if (item.type === "Partido") {
                if (item.title === "Convocatoria para el partido") {
                    closeModal();
                    navigation.navigate('Rendimiento');
                } else if (item.title === "No convocado para el partido") {
                    closeModal();
                    navigation.navigate('Rendimiento');
                } else if (item.title === "¡Gol anotado!") {
                    closeModal();
                    navigation.navigate('Rendimiento');
                } else if (item.title === "Amonestación recibida") {
                    closeModal();
                    navigation.navigate('Rendimiento');
                }
            } else {
                console.log('El tipo de la notificación no se identifico correctamente');
            }
        } else {
            if (item.type === "Registro medico") {
                closeModal();
                navigation.navigate('Medico');
            } else if (item.type === "Test") {
                closeModal();
            } else if (item.type === "Entrenamiento") {
                if (item.title === "Nuevo entrenamiento programado") {
                    closeModal();
                    navigation.navigate('LoginNav', {
                        screen: 'Entrenamientos',
                        params: { idJornada: item.evento }
                    });
                } else {
                    closeModal();
                }
            } else if (item.type === "Eventos") {
                if(item.title === "Tu recap mensual está listo"){
                    closeModal();
                    navigation.navigate('LoginNav', {
                        screen: 'RECAP',
                    });
                }else if(item.title === "Feliz Cumpleaños"){
                    closeModal();
                }else if(item.title === "Convocatoria para el partido"){
                    closeModal();
                }
            } else if (item.type === "Partido") {
                if (item.title === "Convocatoria para el partido") {
                    closeModal();
                    navigation.navigate('Rendimiento');
                } else if (item.title === "No convocado para el partido") {
                    closeModal();
                    navigation.navigate('Rendimiento');
                } else if (item.title === "¡Gol anotado!") {
                    closeModal();
                    navigation.navigate('Rendimiento');
                } else if (item.title === "Amonestación recibida") {
                    closeModal();
                    navigation.navigate('Rendimiento');
                }
            } else {
                console.log('El tipo de la notificación no se identifico correctamente');
            }
        }
    };

    // Función para obtener el ícono según el tipo de notificación
    const getIcon = (type) => {
        switch (type) {
            case 'Registro medico':
                return <MaterialIcons name="medical-services" size={30} color="red" />; // Rojo
            case 'Test':
                return <MaterialIcons name="edit-note" size={30} color="#003366" />; // Azul oscuro
            case 'Entrenamiento':
                return <MaterialCommunityIcons name="soccer-field" size={30} color="green" />; // Verde
            case 'Eventos':
                return <MaterialIcons name="event" size={30} color="yellow" />; // Amarillo
            case 'Partido':
                return <FontAwesome name="soccer-ball-o" size={30} color="#0099cc" />; // Azul claro
            default:
                return <Entypo name="bell" size={30} color="#007bff" />; // Color por defecto
        }
    };

    // Función para obtener el ícono según el tipo de notificación
    const getIconChip = (type) => {
        switch (type) {
            case 'Todas':
                return <Entypo name="menu" size={24} color="#fff" />;
            case 'Registro medico':
                return <MaterialIcons name="medical-services" size={24} color="#fff" />;
            case 'Test':
                return <MaterialIcons name="edit-note" size={24} color="#fff" />;
            case 'Entrenamiento':
                return <MaterialCommunityIcons name="soccer-field" size={24} color="#fff" />;
            case 'Eventos':
                return <MaterialIcons name="event" size={24} color="#fff" />;
            case 'Partido':
                return <FontAwesome name="soccer-ball-o" size={24} color="#fff" />;
            default:
                return <Entypo name="bell" size={24} color="#fff" />;
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Encabezado con gradiente y botón de cerrar */}
                    <LinearGradient colors={['#03045E', '#1976D2']} style={styles.headerModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Notificaciones</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>

                    <View style={styles.chipContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Chip
                                icon={getIconChip('Todas')}
                                selected={selectedTab === 'Todas'}
                                onPress={() => setSelectedTab('Todas')}
                            />
                            <Chip
                                icon={getIconChip('Registro medico')}
                                selected={selectedTab === 'Registro medico'}
                                onPress={() => setSelectedTab('Registro medico')}
                            />
                            <Chip
                                icon={getIconChip('Test')}
                                selected={selectedTab === 'Test'}
                                onPress={() => setSelectedTab('Test')}
                            />
                            <Chip
                                icon={getIconChip('Entrenamiento')}
                                selected={selectedTab === 'Entrenamiento'}
                                onPress={() => setSelectedTab('Entrenamiento')}
                            />
                            <Chip
                                icon={getIconChip('Eventos')}
                                selected={selectedTab === 'Eventos'}
                                onPress={() => setSelectedTab('Eventos')}
                            />
                            <Chip
                                icon={getIconChip('Partido')}
                                selected={selectedTab === 'Partido'}
                                onPress={() => setSelectedTab('Partido')}
                            />
                        </ScrollView>
                    </View>

                    {/* Lista de notificaciones */}

                    {notifications.length > 0 && notifications ? (
                        <FlatList
                            data={notifications}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.card,
                                        { backgroundColor: item.view === "0" ? '#ffffff' : '#dfdfdf' } // Color según el estado (visto o no)
                                    ]}
                                    onPress={() => openNotification(item)}
                                >
                                    <View style={styles.cardIcon}>
                                        {getIcon(item.type)}
                                    </View>
                                    <View style={styles.notificationItem}>
                                        <Text style={styles.notificationText}>{item.message}</Text>
                                        <Text style={styles.notificationDate}>{item.date}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../../assets/find.png')} />
                            <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron resultados</Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width * 0.95,
        maxHeight: height * 0.7,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
    },
    headerModal: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    closeButton: {
        padding: 5,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    notificationItem: {
        padding: 15,
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
        width: width * 0.7,
    },
    notificationDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    card: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        marginStart: 10,
        marginEnd: 10,
        marginBottom: 10,
        elevation: 2,
    },
    cardIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
    },
});

export default NotificationsModal;
