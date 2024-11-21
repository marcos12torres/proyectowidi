import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 

const LoginScreen = () => {
  const [codigo, setCodigo] = useState('');
  const navigation = useNavigation();

  // Códigos predefinidos
  const CODIGO_ALUMNO = '1234';
  const CODIGO_PROFESOR = '5678';

  const verificarUsuario = () => {
    if (codigo === CODIGO_ALUMNO) {
      // Redirigir al alumno
      navigation.navigate('AlumnoScreen');
    } else if (codigo === CODIGO_PROFESOR) {
      // Redirigir al profesor
      navigation.navigate('ProfesorScreen');
    } else {
      // Mostrar alerta si el código es inválido
      Alert.alert('Error', 'Código no válido. Intente nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su código"
        value={codigo}
        onChangeText={setCodigo}
      />
      <Button title="Verificar" onPress={verificarUsuario} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});



