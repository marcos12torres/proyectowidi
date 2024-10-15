import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, CheckBox} from 'react-native';

const AlumnoScreen = () => {

  // Simulamos el estado del cuaderno de comunicaciones (true: tiene, false: no tiene)
  const [cuadernoDeComunicaciones, setCuadernoDeComunicaciones] = useState(false);

  // Simulamos trabajos prácticos entregados
  const trabajosPracticos = [
    { nombre: 'Trabajo Práctico 1', entregado: true },
    { nombre: 'Trabajo Práctico 2', entregado: true },
    { nombre: 'Trabajo Práctico 3', entregado: false },
    { nombre: 'Trabajo Práctico 4', entregado: false },
    { nombre: 'Trabajo Práctico 5', entregado: false },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Planilla de seguimiento</Text>
        <Text style={styles.subTitle}>Alumno: Juan Pérez</Text>

        <View style={styles.box}>
          <Text style={styles.label}>Comentario</Text>
          <Text style={styles.boxContent}>Comentario del profesor...</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Estado</Text>
          <Text style={styles.boxContent}>Aprobado</Text>
        </View>

        {/* Trabajos prácticos entregados con nombres y estado */}
        <View style={styles.box}>
          <Text style={styles.label}>Trabajos Prácticos Entregados</Text>
          {trabajosPracticos.map((trabajo, index) => (
            <View key={index} style={styles.trabajoRow}>
              <Text style={styles.trabajoNombre}>{trabajo.nombre}</Text>
              <Text style={styles.trabajoEstado}>{trabajo.entregado ? 'Entregado' : 'No entregado'}</Text>
            </View>
          ))}
        </View>

        {/* Cuaderno de comunicaciones con checkbox */}
        <View style={styles.box}>
          <Text style={styles.label}>Cuaderno de comunicaciones</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={cuadernoDeComunicaciones}
              onValueChange={setCuadernoDeComunicaciones}
            />
            <Text style={styles.boxContent}>{cuadernoDeComunicaciones ? 'Sí' : 'No'}</Text>
          </View>
        </View>

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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxContent: {
    fontSize: 16,
    color: '#000',
  },
  trabajoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  trabajoNombre: {
    fontSize: 16,
  },
  trabajoEstado: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default AlumnoScreen;
