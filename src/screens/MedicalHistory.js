import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MedicalHistory = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInjury, setSelectedInjury] = useState(null);
  const [injuries, setInjuries] = useState([
    { part: 'Tren superior', days: 4, injuryDate: '8 de noviembre 2023', returnDate: '12 de noviembre 2023' },
    { part: 'Tren inferior', days: 10, injuryDate: '10 de noviembre 2022', returnDate: '20 de noviembre 2022' },
    { part: 'Tren superior', days: 25, injuryDate: '1 de diciembre 2023', returnDate: '26 de diciembre 2023' },
    { part: 'Tren inferior', days: 3, injuryDate: '5 de enero 2024', returnDate: '8 de enero 2024' },
    { part: 'Tren superior', days: 8, injuryDate: '15 de febrero 2024', returnDate: '23 de febrero 2024' },
  ]);

  const openModal = (injury) => {
    setSelectedInjury(injury);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Historial Médico</Text>
      <View style={styles.infoRow}>
        <Ionicons name="football" size={24} color="black" />
        <Text style={styles.infoText}>
          Selecciona un registro o un retorno y observa tus fechas de la lesión y retorno a los partidos
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#777"
        />
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Lesión</Text>
        <Text style={styles.tableHeaderText}>Días lesionado</Text>
        <Text style={styles.tableHeaderText}>Fechas</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {injuries.map((injury, index) => (
          <View key={index} style={styles.injuryRow}>
            <Text style={styles.injuryText}>{injury.part}</Text>
            <Text style={styles.injuryText}>{injury.days}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={[styles.iconButton, styles.redButton]} onPress={() => openModal(injury)}>
                <Image source={require('../../assets/lesion.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconButton, styles.greenButton]} onPress={() => openModal(injury)}>
                <Image source={require('../../assets/pelota.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalContainer}>
            <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
              <View style={styles.modalRow}>
                <Image style={styles.modalImage} source={require('../../assets/gol_blanco 2.png')} />
                <Text style={styles.modalTitle}>Registro</Text>
              </View>
            </LinearGradient>

            <ScrollView>
              <View style={styles.modalContent}>
                <View style={styles.dateCard}>
                  <Text style={styles.dateText}>{selectedInjury?.injuryDate}</Text>
                  <Text style={styles.dateLabel}>Fecha de la lesión</Text>
                </View>
                <View style={styles.dateCard}>
                  <Text style={styles.dateText}>{selectedInjury?.returnDate}</Text>
                  <Text style={styles.dateLabel}>Fecha de regreso</Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#334195',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  injuryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 15,
  },
  injuryText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  iconButton: {
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: '#ff4d4d',
  },
  greenButton: {
    backgroundColor: '#4cd964',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: windowWidth * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
  },
  dateCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderStartColor: '#020887',
    borderStartWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dateLabel: {
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#F44262',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicalHistory;
