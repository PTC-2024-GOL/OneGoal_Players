import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Entypo, MaterialIcons, Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'; // Importa múltiples librerías de iconos
import Chip from '../Chip/Chip';
const { width, height } = Dimensions.get('window');

const NotificationsModal = ({ modalVisible, setModalVisible }) => {

    const [selectedTab, setSelectedTab] = useState('messages');
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Tu cita médica está programada para mañana a las 10:00 AM.', date: '07/10/2024', view: "0", type: 'Registro medico' },
        { id: 2, message: 'El resultado de tu prueba está disponible en el sistema.', date: '06/10/2024', view: "0", type: 'Entrenamiento' },
        { id: 3, message: 'Recuerda completar tu test físico después del entrenamiento.', date: '05/10/2024', view: "0", type: 'Test' },
        { id: 4, message: 'Felicitaciones marcaste un gol en tu ultimo partido.', date: '05/10/2024', view: "1", type: 'Partido' },
        { id: 5, message: 'Gol te desea un feliz cumpleaños.', date: '05/10/2024', view: "1", type: 'Eventos' },
        { id: 6, message: 'Tu recap del mes esta disponible, da click para verlo .', date: '05/10/2024', view: "1", type: 'Eventos' },
    ]);
    const closeModal = () => {
        setModalVisible(false); // Cerrar el modal
    };


    // Función para abrir el modal y marcar como vista la notificación
    const openNotification = async (item) => {
        console.log('Aquí se abrira el detalle de la notificación');
        console.log(item);
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
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
        width: width * 0.75,
    },
    notificationDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
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
