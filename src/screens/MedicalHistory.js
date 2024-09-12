import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import fetchData from '../../api/components';
import { useFocusEffect } from "@react-navigation/native";
import { Searchbar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MedicalHistory = () => {
  // URL de la API para el usuario
  const API = 'services/players/registro_medico.php';

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInjury, setSelectedInjury] = useState(null);
  const [returnModalVisible, setReturnModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  //Constantes para la busqueda con el elemento de la libreria searchBar
  const onChangeSearch = query => setSearchQuery(query);
  const [injuries, setInjuries] = useState([
    { part: ' ', days: ' ', injuryDate: ' ', returnDate: ' ', returnTraining:' ', returnMatch:' '  },
  ]);
  const [data, setData] = useState(false);

  const fillRegistroMedico = async (searchForm = null) => {
    try {
      const action = searchForm ? "searchRows" : "readAllMobile";
      const data = await fetchData(API, action, searchForm);
        if (data.status) {
            const info = data.dataset.map(item => {
                const part = item.nombre_sub_tipologia;
                const days = item.dias_lesionado;
                const injuryDate = item.fecha_lesion;
                const returnDate = item.fecha_registro;
                const returnTraining=item.retorno_entreno;
                const returnMatch=item.fecha_partido;

                return {
                    part,
                    days,
                    injuryDate,
                    returnDate,
                    returnTraining,
                    returnMatch,
                };
            });

            setInjuries(info); 
            setData(true);
        } else {
            console.log(data.error);
            setData(false);
        }
    } catch (e) {
        console.log(e);
    }
};    

  const openModal = (injury) => {
    setSelectedInjury(injury);
    setModalVisible(true);
  };

  const openReturnModal = (injury) => {
    setSelectedInjury(injury);
    setReturnModalVisible(true);
  };

  useEffect(() => {
    const initializeApp = async () => {
        await fillRegistroMedico();
    };
    initializeApp();
}, []);

useEffect(() => {
  if (searchQuery != "") {
    const formData = new FormData();
    formData.append("search", searchQuery);
    fillRegistroMedico(formData);
  } else {
    fillRegistroMedico();
  }
}, [searchQuery]);

useFocusEffect(
    useCallback(() => {
        const initializeApp = async () => {
            await fillRegistroMedico();
        };
        initializeApp();
    }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Historial Médico</Text>
      <View style={styles.infoRow}>
        <Ionicons name="football" size={24} color="black" />
        <Text style={styles.infoText}>
          Selecciona un registro o un retorno y observa tus fechas de la lesión y retorno a los partidos
        </Text>
      </View>
      <Searchbar
        placeholder="Buscar pagos"
        placeholderTextColor="gray"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
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
              <TouchableOpacity style={[styles.iconButton, styles.greenButton]} onPress={() => openReturnModal(injury)}>
                <Image source={require('../../assets/pelota.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal de Registro */}
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

      {/* Modal de Retorno */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={returnModalVisible}
        onRequestClose={() => setReturnModalVisible(false)}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalContainer}>
            <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
              <View style={styles.modalRow}>
                <Image style={styles.modalImage} source={require('../../assets/gol_blanco 2.png')} />
                <Text style={styles.modalTitle}>Retorno</Text>
              </View>
            </LinearGradient>

            <ScrollView>
              <View style={styles.modalContent}>
                <View style={styles.dateCard}>
                  <Text style={styles.dateText}>{selectedInjury?.returnTraining}</Text>
                  <Text style={styles.dateLabel}>Retorno a entreno</Text>
                </View>
                <View style={styles.dateCard}>
                  <Text style={styles.dateText}>{selectedInjury?.returnMatch}</Text>
                  <Text style={styles.dateLabel}>Retorno a partido</Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setReturnModalVisible(false)}
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
    marginBottom:windowHeight * 0.13,
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
  searchbar: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    color: 'gray',
    maxHeight: windowHeight * 0.065,
    maxWidth: windowWidth * 0.9,
},
});

export default MedicalHistory;
