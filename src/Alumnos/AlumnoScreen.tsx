import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface AlumnoData {
  nombre: string;
  comentario: string;
  aprobado: boolean;
  comunicaciones: boolean;
  entregados: boolean;
}

const AlumnoScreen = () => {
  const [planilla, setPlanilla] = useState<AlumnoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnoData = async () => {
      try {
        const user = auth().currentUser;

        if (user) {
          const alumnoId = user.uid;
          const cursoId = "6°6";

          const alumnoDoc = await firestore()
            .collection('cursos')
            .doc(cursoId)
            .collection('alumnos')
            .doc(alumnoId)
            .get();

          if (alumnoDoc.exists) {
            setPlanilla(alumnoDoc.data() as AlumnoData); // Convertimos a AlumnoData
          } else {
            console.error('El documento del alumno no existe.');
          }
        } else {
          console.error('No hay un usuario autenticado.');
        }
      } catch (error) {
        console.error('Error al obtener los datos del alumno:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnoData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando planilla de seguimiento...</Text>
      </View>
    );
  }

  if (!planilla) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontraron datos para este alumno.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Planilla de seguimiento</Text>
        <Text style={styles.subTitle}>Alumno: {planilla.nombre}</Text>

        <View style={styles.box}>
          <Text style={styles.label}>Comentario</Text>
          <Text style={styles.boxContent}>{planilla.comentario || 'Sin comentarios'}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Estado</Text>
          <Text style={styles.boxContent}>
            {planilla.aprobado ? 'Aprobado' : 'Desaprobado'}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Cuaderno de Comunicaciones</Text>
          <Text style={styles.boxContent}>
            {planilla.comunicaciones ? 'Sí' : 'No'}
          </Text>
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
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
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
});

export default AlumnoScreen;
