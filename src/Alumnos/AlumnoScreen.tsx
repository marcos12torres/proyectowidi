import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Navigation'; // Ajusta la ruta según tu estructura

type AlumnoScreenProps = DrawerScreenProps<RootDrawerParamList, 'Pantalla del alumno'>;

const AlumnoScreen: React.FC<AlumnoScreenProps> = ({ route, navigation }) => {
  const { alumnoId } = route.params;
  
  // ... resto del código permanece igual ...
};

// Definimos las interfaces necesarias
interface TrabajosPracticos {
  nombre: string;
  entregado: boolean;
}

interface DatosAlumno {
  nombre: string;
  comentario: string;
  estado: string;
  cuadernoDeComunicaciones: boolean;
  trabajosPracticos: TrabajosPracticos[];
}

// Definimos los tipos para la ruta
type RootStackParamList = {
  AlumnoView: { alumnoId: string };
};

type AlumnoScreenRouteProp = RouteProp<RootStackParamList, 'AlumnoView'>;

type AlumnoScreenProps = DrawerScreenProps<RootDrawerParamList, 'Pantalla del alumno'>;

const AlumnoScreen: React.FC<AlumnoScreenProps> = ({ route, navigation }) => {
  const { alumnoId } = route.params;
  
  const [datosAlumno, setDatosAlumno] = useState<DatosAlumno>({
    nombre: '',
    comentario: '',
    estado: '',
    cuadernoDeComunicaciones: false,
    trabajosPracticos: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerDatosAlumno = async () => {
      try {
        const alumnoRef = firestore()
          .collection('alumnos')
          .doc(alumnoId);
        
        const docSnapshot = await alumnoRef.get();
        
        if (docSnapshot.exists) {
          const datos = docSnapshot.data() as DatosAlumno;
          setDatosAlumno({
            nombre: datos.nombre || '',
            comentario: datos.comentario || '',
            estado: datos.estado || '',
            cuadernoDeComunicaciones: datos.cuadernoDeComunicaciones || false,
            trabajosPracticos: datos.trabajosPracticos || []
          });
        } else {
          setError('No se encontró la información del alumno');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosAlumno();
  }, [alumnoId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Mi Planilla de Seguimiento</Text>
        <Text style={styles.subTitle}>Alumno: {datosAlumno.nombre}</Text>

        <View style={styles.box}>
          <Text style={styles.label}>Estado General</Text>
          <Text style={[
            styles.boxContent,
            datosAlumno.estado === 'Aprobado' ? styles.aprobado : styles.desaprobado
          ]}>
            {datosAlumno.estado || 'Pendiente'}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Comentario del Profesor</Text>
          <Text style={styles.boxContent}>
            {datosAlumno.comentario || 'Sin comentarios'}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Trabajos Prácticos</Text>
          {datosAlumno.trabajosPracticos.length > 0 ? (
            datosAlumno.trabajosPracticos.map((tp, index) => (
              <View key={index} style={styles.trabajoRow}>
                <Text style={styles.trabajoNombre}>{tp.nombre}</Text>
                <Text style={[
                  styles.trabajoEstado,
                  tp.entregado ? styles.entregado : styles.noEntregado
                ]}>
                  {tp.entregado ? 'Entregado' : 'No entregado'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.boxContent}>No hay trabajos prácticos asignados</Text>
          )}
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Cuaderno de Comunicaciones</Text>
          <Text style={[
            styles.boxContent,
            datosAlumno.cuadernoDeComunicaciones ? styles.entregado : styles.noEntregado
          ]}>
            {datosAlumno.cuadernoDeComunicaciones ? 'Entregado' : 'No entregado'}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#34495e',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  boxContent: {
    fontSize: 16,
    color: '#34495e',
  },
  trabajoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  trabajoNombre: {
    fontSize: 16,
    color: '#34495e',
  },
  trabajoEstado: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aprobado: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  desaprobado: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  entregado: {
    color: '#2ecc71',
  },
  noEntregado: {
    color: '#e74c3c',
  }
});

export default AlumnoScreen;
