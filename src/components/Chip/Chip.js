import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function Chip({ icon, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#03045E',
    marginHorizontal: 5,
    maxWidth: windowWidth * 0.15,
    elevation: 2,
  },
  selectedChip: {
    backgroundColor: '#1e88e5',
  },
});
