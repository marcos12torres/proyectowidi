import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const UserTypeSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Registrarse como Alumno"
        onPress={() => navigation.navigate('RegistroAlumno')}
      />
      <Button
        title="Registrarse como Profesor"
        onPress={() => navigation.navigate('RegistroProfesor')}
      />
      <Button
        title="Registrarse como Padre"
        onPress={() => navigation.navigate('RegistroAlumno')}
      />
        <Button
        title="Registrarse como asesor"
        onPress={() => navigation.navigate('RegistroAlumno')}
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
