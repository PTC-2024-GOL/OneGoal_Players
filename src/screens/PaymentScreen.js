import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const PaymentScreen = () => {
  const payments = [
    { month: 'Enero', amount: 20.25, isPaid: true },
    { month: 'Febrero', amount: 20.25, isPaid: true },
    { month: 'Marzo', amount: 20.25, isPaid: true },
    { month: 'Abril', amount: 20.25, isPaid: true },
    { month: 'Mayo', amount: 20.25, isPaid: true },
  ];

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
        <Text style={[styles.tableHeaderText, styles.monthColumn]}>Mes</Text>
        <Text style={[styles.tableHeaderText, styles.dateColumn]}>Fecha</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {payments.map((payment, index) => (
          <View key={index} style={styles.paymentRow}>
            <Text style={[styles.paymentText, styles.amountColumn]}>${payment.amount.toFixed(2)}</Text>
            <Text style={[styles.paymentText, styles.lateColumn]}>No</Text>
            <Text style={[styles.paymentText, styles.feeColumn]}>$0.25</Text>
            <Text style={[styles.paymentText, styles.monthColumn]}>{payment.month}</Text>
            <View style={[styles.dateColumn, styles.iconContainer]}>
              <TouchableOpacity style={[styles.iconButton, styles.blueButton]}>
                <Image source={require('../../assets/calendario.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  amountColumn: {
    width: '20%',
  },
  lateColumn: {
    width: '20%',
  },
  feeColumn: {
    width: '15%',
  },
  monthColumn: {
    width: '25%',
  },
  dateColumn: {
    width: '20%',
    alignItems: 'center',
  },
});

export default PaymentScreen;