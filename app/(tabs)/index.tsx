import React from 'react';
import { View } from 'react-native';
import AlumnosScreen from '@/components/alumnoScreen';


const IndexScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <AlumnosScreen />
    </View>
  );
};

export default IndexScreen;
