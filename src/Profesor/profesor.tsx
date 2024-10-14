import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, CheckBox } from 'react-native';
import { firestore } from '@/firebase'; // Asegúrate de que la ruta sea correcta
import { collection, doc, setDoc } from 'firebase/firestore';

const PadresScreen = () => {
  const [comentario, setComentario] = useState('');
  const [estadoAprobado, setEstadoAprobado] = useState(false);
  const [cuadernoDeComunicaciones, setCuadernoDeComunicaciones] = useState(false);
  const [trabajosPracticos, setTrabajosPracticos] = useState([
    { nombre: 'Trabajo Práctico 1', entregado: false },
    { nombre: 'Trabajo Práctico 2', entregado: false },
    { nombre: 'Trabajo Práctico 3', entregado: false },
  ]);

  const guardarDatos = async () => {
    try {
      const alumnoRef = doc(collection(firestore, 'alumnos'), 'ID_DEL_ALUMNO'); // Cambia esto por el ID del alumno que deseas actualizar
      await setDoc(alumnoRef, {
        comentario,
        estadoAprobado,
        cuadernoDeComunicaciones,
        trabajosPracticos
      });
      alert('Datos guardados correctamente');
    } catch (error) {
      console.error('Error al guardar los datos: ', error);
      alert('Error al guardar los datos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Planilla de seguimiento</Text>
        <Text style={styles.subTitle}>Alumno: Juan Pérez</Text>

        <View style={styles.box}>
          <Text style={styles.label}>Comentario</Text>
          <TextInput
            style={styles.input}
            value={comentario}
            onChangeText={setComentario}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Estado</Text>
          <CheckBox
            value={estadoAprobado}
            onValueChange={setEstadoAprobado}
          />
          <Text>{estadoAprobado ? 'Aprobado' : 'No Aprobado'}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Cuaderno de comunicaciones</Text>
          <CheckBox
            value={cuadernoDeComunicaciones}
            onValueChange={setCuadernoDeComunicaciones}
          />
          <Text>{cuadernoDeComunicaciones ? 'Sí' : 'No'}</Text>
        </View>

        {/* Trabajos prácticos */}
        <View style={styles.box}>
          <Text style={styles.label}>Trabajos Prácticos</Text>
          {trabajosPracticos.map((trabajo, index) => (
            <View key={index} style={styles.trabajoRow}>
              <Text>{trabajo.nombre}</Text>
              <CheckBox
                value={trabajo.entregado}
                onValueChange={() => {
                  const nuevosTrabajos = [...trabajosPracticos];
                  nuevosTrabajos[index].entregado = !nuevosTrabajos[index].entregado;
                  setTrabajosPracticos(nuevosTrabajos);
                }}
              />
              <Text>{trabajo.entregado ? 'Entregado' : 'No entregado'}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={guardarDatos}>
          <Text style={styles.buttonText}>Guardar Datos</Text>
        </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  trabajoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7FFFD4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PadresScreen;
