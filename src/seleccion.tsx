import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type Props = {
  navigation: DrawerNavigationProp<any>;
};



const UserTypeSelectionScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Button
        title="Registrarse como Alumno"
        onPress={() => navigation.navigate('Pantalla del alumno')}
      />
      <Button
        title="Registrarse como Profesor"
        onPress={() => navigation.navigate('Profesor')}
      />
      <Button
        title="Registrarse como Padre"
        onPress={() => navigation.navigate('Pantalla que ve el padre')}
      />
      <Button
        title="Registrarse como asesor"
        onPress={() => navigation.navigate('Asesor')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserTypeSelectionScreen;
