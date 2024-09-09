import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 
const windowWidth = Dimensions.get('window').width;
 
const MedicalHistory = () => {
  const injuries = [
    { part: 'Tren superior', days: 4 },
    { part: 'Tren inferior', days: 10 },
    { part: 'Tren superior', days: 25 },
    { part: 'Tren inferior', days: 3 },
    { part: 'Tren superior', days: 8 },
  ];
 
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
              <TouchableOpacity style={[styles.iconButton, styles.redButton]}>
                <Image source={require('../../assets/lesion.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconButton, styles.greenButton]}>
                <Image source={require('../../assets/pelota.png')} style={styles.icon} />
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
});
 
export default MedicalHistory;