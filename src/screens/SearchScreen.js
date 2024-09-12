import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SearchScreen = ({setLogueado, logueado}) => {
  const route = useRoute();
  const { searchQuery } = route.params;

  return (
    <View>
      <Text>Resultados de búsqueda para: {searchQuery}</Text>
    </View>
  );
};

export default SearchScreen;
