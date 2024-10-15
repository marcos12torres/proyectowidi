import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, CheckBox } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { auth, provider } from '../auth/firebase';

const PadresScreen = () => {
  const [profesorInfoVisible, setProfesorInfoVisible] = useState(false);
  const [comentario, setComentario] = useState('');
  const [estadoAprobado, setEstadoAprobado] = useState(false); 
  const [cuadernoDeComunicaciones, setCuadernoDeComunicaciones] = useState(false); 
  const [trabajosPracticos, setTrabajosPracticos] = useState([
    { nombre: 'Trabajo Práctico 1', entregado: false },
    { nombre: 'Trabajo Práctico 2', entregado: false },
    { nombre: 'Trabajo Práctico 3', entregado: false }
  ]);

  const toggleProfesorInfo = () => setProfesorInfoVisible(!profesorInfoVisible);

  const handleToggleTrabajo = (index) => {
    const updatedTrabajos = [...trabajosPracticos];
    updatedTrabajos[index].entregado = !updatedTrabajos[index].entregado;
    setTrabajosPracticos(updatedTrabajos);
    guardarDatosEnFirebase(); // Save data after toggling trabajo
  };

  // Function to save data in Firebase
  const guardarDatosEnFirebase = async () => {
    try {
      await firestore()
        .collection('profesores')
        .doc('profesorId1') // Change this ID to the actual professor ID
        .collection('cursos')
        .doc('cursoId1') // Change this ID to the actual course ID
        .collection('alumnos')
        .doc('alumnoId1') // Change this ID to the actual student ID
        .set({
          comentario: comentario,
          estadoAprobado: estadoAprobado,
          cuadernoDeComunicaciones: cuadernoDeComunicaciones,
          trabajosPracticos: trabajosPracticos,
        });
      console.log('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los datos en Firestore:', error);
    }
  };

  // Update comentario and save in Firebase
  const handleComentarioChange = (text) => {
    setComentario(text);
    guardarDatosEnFirebase();
  };

  // Update estadoAprobado and save in Firebase
  const handleEstadoChange = (value) => {
    setEstadoAprobado(value);
    guardarDatosEnFirebase();
  };

  // Update cuadernoDeComunicaciones and save in Firebase
  const handleCuadernoChange = (value) => {
    setCuadernoDeComunicaciones(value);
    guardarDatosEnFirebase();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Planilla de seguimiento</Text>
        <Text style={styles.subTitle}>Alumno: Juan Pérez</Text>

        {/* Campo de comentario */}
        <View style={styles.box}>
          <Text style={styles.label}>Comentario</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe un comentario..."
            value={comentario}
            onChangeText={handleComentarioChange} // Update to handleComentarioChange
          />
        </View>

        {/* Estado del alumno (aprobado o no) */}
        <View style={styles.box}>
          <Text style={styles.label}>Estado</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox value={estadoAprobado} onValueChange={handleEstadoChange} /> {/* Update to handleEstadoChange */}
            <Text style={styles.boxContent}>{estadoAprobado ? 'Aprobado' : 'No aprobado'}</Text>
          </View>
        </View>

        {/* Trabajos prácticos entregados con checkbox */}
        <View style={styles.box}>
          <Text style={styles.label}>Trabajos Prácticos Entregados</Text>
          {trabajosPracticos.map((trabajo, index) => (
            <View key={index} style={styles.trabajoRow}>
              <Text style={styles.trabajoNombre}>{trabajo.nombre}</Text>
              <CheckBox
                value={trabajo.entregado}
                onValueChange={() => handleToggleTrabajo(index)} // This will save automatically
              />
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
              onValueChange={handleCuadernoChange} // Update to handleCuadernoChange
            />
            <Text style={styles.boxContent}>{cuadernoDeComunicaciones ? 'Sí' : 'No'}</Text>
          </View>
        </View>

        {/* Botón para guardar datos en Firebase */}
        <TouchableOpacity style={styles.guardarButton} onPress={guardarDatosEnFirebase}>
          <Text style={styles.guardarButtonText}>Guardar Datos</Text>
        </TouchableOpacity>

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
  boxContent:{
    fontSize: 16,
    color:'#000',
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
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
  guardarButton: {
    backgroundColor: '#7FFFD4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  guardarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    marginBottom: 5,
  },
});

export default PadresScreen;
