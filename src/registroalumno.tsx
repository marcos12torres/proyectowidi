import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const RegistroAlumno = ({ navigation }: Props) => {
  const [codigoAlumno, setCodigoAlumno] = useState('');

  const registrarAlumno = () => {
    if (codigoAlumno.trim() === '') {
      Alert.alert('Error', 'Por favor, ingrese un código de alumno');
      return;
    }

    firestore()
      .collection('cursos')
      .doc('6°6') // Este puede ser dinámico si los cursos varían
      .collection('alumnos')
      .doc(codigoAlumno) // El código será el ID del documento
      .set({
        aprobado: false,
        comentario: '',
        comunicaciones: false,
        entregados: false,
        nombre: `Alumno ${codigoAlumno}`, // Esto podría ser ingresado por el usuario
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Éxito', 'Alumno registrado correctamente');
        navigation.navigate('AlumnoScreen', { codigoAlumno });
      })
      .catch((error) => {
        Alert.alert('Error', 'No se pudo registrar al alumno: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su código de alumno"
        value={codigoAlumno}
        onChangeText={setCodigoAlumno}
      />
      <Button title="Registrar" onPress={registrarAlumno} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default RegistroAlumno;
