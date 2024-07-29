import React from 'react';
import { View, Text } from 'react-native';
import AlumnosScreen from '@/components/alumnosScreen'; 

const IndexScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <AlumnosScreen />
    </View>
  );
};

export default IndexScreen;