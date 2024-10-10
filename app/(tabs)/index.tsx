import React from 'react';
import { View } from 'react-native';
//import AlumnoViewScreen from '@/src/Alumnos/AlumnoViewScreen';
import PadresScreen from '@/src/Padres/PadresViewScreen';
const IndexScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <PadresScreen></PadresScreen>
    </View>
  );
};

export default IndexScreen;
