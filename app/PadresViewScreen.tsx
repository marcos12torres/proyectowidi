import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const PadresScreen = () => {
  const [profesorInfoVisible, setProfesorInfoVisible] = useState(false);

  const toggleProfesorInfo = () => {
    setProfesorInfoVisible(!profesorInfoVisible);
  };

  // Simulamos el estado del cuaderno de comunicaciones (true: tiene, false: no tiene)
  const cuadernoDeComunicaciones = false; // Puedes cambiar este valor para probar

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Texto centrado */}
        <Text style={styles.title}>Planilla de seguimiento</Text>
        <Text style={styles.subTitle}>Alumno: Juan Pérez</Text>

        {/* Simular la planilla de seguimiento del alumno */}
        <View style={styles.box}>
          <Text style={styles.label}>Comentario</Text>
          <Text style={styles.boxContent}>Comentario del profesor...</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Estado</Text>
          <Text style={styles.boxContent}>Aprobado</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Trabajos entregados</Text>
          <Text style={styles.boxContent}>3 de 5 entregados</Text>
        </View>

        {/* Condicional para cambiar el color del cuaderno de comunicaciones */}
        <View style={cuadernoDeComunicaciones ? styles.box : styles.boxRed}>
          <Text style={styles.label}>Cuaderno de comunicaciones</Text>
          <Text style={styles.boxContent}>{cuadernoDeComunicaciones ? 'Si' : 'No'}</Text>
        </View>

        {/* Botón desplegable para la información del profesor */}
        <TouchableOpacity style={styles.profesorButton} onPress={toggleProfesorInfo}>
          <Text style={styles.profesorButtonText}>Información del profesor</Text>
        </TouchableOpacity>

        {profesorInfoVisible && (
          <View style={styles.profesorInfoBox}>
            <Text style={styles.profesorText}>Profesor: Juan Pérez</Text>
            <Text style={styles.profesorText}>Correo: profesor@example.com</Text>
            <Text style={styles.profesorText}>Celular: +1234567890</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#E0FFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  boxRed: {
    backgroundColor: '#FF6347', // Caja roja si no tiene cuaderno
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxContent: {
    fontSize: 16,
    color: '#000',
  },
  profesorButton: {
    backgroundColor: '#7FFFD4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  profesorButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  profesorInfoBox: {
    backgroundColor: '#E0FFFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  profesorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
});

export default PadresScreen;