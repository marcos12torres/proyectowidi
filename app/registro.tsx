import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { auth } from './firebase'; // Asegúrate de importar tu configuración de Firebase 

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al registrar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      {/* ... Tu diseño de formulario aquí ... */}
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registro;