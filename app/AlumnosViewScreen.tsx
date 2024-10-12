import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Alumno {
  nombre: string;
  comentario: string;
  aprobado: boolean;
  entregados: boolean;
  comunicaciones: boolean;
}

const AlumnoViewScreen: React.FC = () => {
  const [alumno, setAlumno] = useState<Alumno>({
    nombre: 'Pepito Juarez',
    comentario: 'Buen trabajo en general, pero puede mejorar en matemáticas.',
    aprobado: true, 
    entregados: true,
    comunicaciones: false,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{alumno.nombre}</Text>
      </View>

      <View style={styles.content}>
        {/* Comentario */}
        <View style={styles.box}>
          <Text style={styles.label}>Comentario:</Text>
          <Text style={styles.value}>{alumno.comentario}</Text>
        </View>

        {/* Estado */}
        <View style={styles.box}>
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.value}>{alumno.aprobado ? 'Aprobado' : 'No Aprobado'}</Text>
        </View>

        {/* Trabajos Entregados */}
        <View style={styles.box}>
          <Text style={styles.label}>Trabajos Entregados:</Text>
          <Text style={styles.value}>{alumno.entregados ? 'Entregados' : 'No Entregados'}</Text>
        </View>

        {/* Cuaderno de Comunicaciones */}
        <View style={[
          styles.box,
          { backgroundColor: alumno.comunicaciones ? '#B2DFEE' : '#f44336' }
        ]}>
          <Text style={styles.label}>Cuaderno de Comunicaciones:</Text>
          <Text style={styles.value}>{alumno.comunicaciones ? 'Sí' : 'No'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    backgroundColor: '#7fffd4',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    flexDirection: 'column',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
});

export default AlumnoViewScreen;