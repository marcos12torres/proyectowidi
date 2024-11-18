import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import AlumnosScreen from '../Profesor/profesor';
import AlumnoScreen from '@/src/Alumnos/AlumnoViewScreen';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Autenticar usuario con Firebase
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // Verificar si es un profesor o un alumno desde Firebase
      const profesorDoc = await firestore().collection('profesores').doc(userId).get();
      const alumnoDoc = await firestore().collection('alumnos').doc(userId).get();

      if (profesorDoc.exists) {
        console.log('Usuario autenticado como profesor');
        navigation.navigate('profesor'); // Redirigir a la pantalla de profesor
      } else if (alumnoDoc.exists) {
        console.log('Usuario autenticado como alumno');
        navigation.navigate('AlumnoHome'); // Redirigir a la pantalla de alumno
      } else {
        Alert.alert('Error', 'No se encontró al usuario en los registros.');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

export default Login;
