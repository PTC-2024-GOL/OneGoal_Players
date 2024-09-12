import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import fetchData from '../../api/components';
import { useFocusEffect } from "@react-navigation/native";
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const PaymentScreen = () => {
  // URL de la API para el usuario
  const API = 'services/players/pagos.php';

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [data, setData] = useState(false);
 
  const [payments, setPaymets] = useState([
    { month: ' ', amount: ' ', mora: ' ', date: ' ', isLate: ' ', total:' ' },
    { month: ' ', amount: ' ', mora: ' ', date: ' ', isLate: ' ', total:' ' },
  ]);

 const fillPagos= async () => {
    try {
        const data = await fetchData(API, 'readAllMobile');
        if (data.status) {
            const info = data.dataset.map(item => {
                const month = item.MES;
                const amount = item.CANTIDAD;
                const mora = item.MORA;
                const date = item.FECHA;
                const isLate=item.TARDIO;
                const total=item.TOTAL;

                return {
                    month,
                    amount,
                    mora,
                    date,
                    isLate,
                    total,
                };
            });

            setPaymets(info); 
            setData(true);
        } else {
            console.log(data.error);
            setData(false);
        }
    } catch (e) {
        console.log(e);
    }
};    

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setModalVisible(true);
  };

  useEffect(() => {
    const initializeApp = async () => {
        await fillPagos();
    };
    initializeApp();
}, []);

useFocusEffect(
    useCallback(() => {
        const initializeApp = async () => {
            await fillPagos();
        };
        initializeApp();
    }, [])
);


 
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Historial de Pagos</Text>
      <View style={styles.infoRow}>
        <Ionicons name="football" size={24} color="black" />
        <Text style={styles.infoText}>
          Selecciona una fecha y visualiza las fechas y el mes de tu pago
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
        <Text style={[styles.tableHeaderText, styles.amountColumn]}>Cantidad</Text>
        <Text style={[styles.tableHeaderText, styles.lateColumn]}>Pago tardío</Text>
        <Text style={[styles.tableHeaderText, styles.feeColumn]}>Mora</Text>
        <Text style={[styles.tableHeaderText, styles.totalColumn]}>Total</Text>
        <Text style={[styles.tableHeaderText, styles.dateColumn]}>Fecha</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {payments.map((payment, index) => (
          <View key={index} style={styles.paymentRow}>
            <Text style={[styles.paymentText, styles.amountColumn]}>${payment.amount}</Text>
            <View style={[styles.lateColumn, styles.iconContainer]}>
              <Ionicons
                name="time-outline"
                size={24}
                color={payment.isLate ? '#F44262' : '#4CAF50'}
              />
            </View>
            <Text style={[styles.paymentText, styles.feeColumn]}>${payment.mora}</Text>
            <Text style={[styles.paymentText, styles.totalColumn]}>${payment.total}</Text>
            <View style={[styles.dateColumn, styles.iconContainer]}>
              <TouchableOpacity
                style={[styles.iconButton, styles.blueButton]}
                onPress={() => openModal(payment)}
              >
                <Image source={require('../../assets/calendario.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
 
      {/* Modal de Fecha y Mes */}
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
                <Text style={styles.modalTitle}>Fecha</Text>
              </View>
            </LinearGradient>
            <View style={styles.modalContent}>
              <View style={styles.dateCard}>
                <Text style={styles.dateText}>{selectedPayment?.date}</Text>
                <Text style={styles.dateLabel}>Fecha de pago</Text>
              </View>
              <View style={styles.dateCard}>
                <Text style={styles.dateText}>{selectedPayment?.month}</Text>
                <Text style={styles.dateLabel}>Mes de pago</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
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
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 15,
  },
  paymentText: {
    fontSize: 12,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButton: {
    backgroundColor: '#3498db',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  amountColumn: { width: '20%' },
  lateColumn: { width: '20%' },
  feeColumn: { width: '20%' },
  totalColumn: { width: '20%' },
  dateColumn: { width: '20%', alignItems: 'center' },
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
    shadowOffset: { width: 0, height: 2 },
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
    borderLeftColor: '#020887',
    borderLeftWidth: 5,
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
    marginTop: 4,
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
  lateColumn: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
export default PaymentScreen;