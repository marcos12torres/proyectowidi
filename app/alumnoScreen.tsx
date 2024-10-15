import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { auth, provider } from '../app/auth/firebase'; // Importa la configuración de Firebase
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase Firestore
const db = getFirestore();

interface Alumno {
  nombre: string;
  comentario: string;
  aprobado: boolean;
  entregados: boolean;
  comunicaciones: boolean;
}

const AlumnosScreen: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([
    { nombre: 'Pepito Juarez', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'Sandra Martines', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'Esteban Quito', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'Mema Mosiempre', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'Fito Paez', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
  ]);

  const [alumnos2, setAlumnos2] = useState<Alumno[]>([
    { nombre: 'Sasa Toto', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'Sisi Pp', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
  ]);

  const [alumnos3, setAlumnos3] = useState<Alumno[]>([
    { nombre: 'Caca Sese', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'Esperanza Si', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
  ]);

  const [alumnos4, setAlumnos4] = useState<Alumno[]>([
    { nombre: 'Pepe El Grilo', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'Palo Nooo', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
  ]);

  const [selectedCurso, setSelectedCurso] = useState('6º1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMateriasMenu, setShowMateriasMenu] = useState<boolean>(false);
  const [showCursosMenu, setShowCursosMenu] = useState<boolean>(false);

  const [cursoToAdd, setCursoToAdd] = useState('');
  const [alumnoToAdd, setAlumnoToAdd] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleCommentChange = (index: number, text: string) => {
    const updatedAlumnos = [...renderAlumnos()];
    updatedAlumnos[index].comentario = text;
    setCurrentAlumnos(updatedAlumnos);
  };

  const handleAprobadoChange = (index: number) => {
    const updatedAlumnos = [...renderAlumnos()];
    updatedAlumnos[index].aprobado = !updatedAlumnos[index].aprobado;
    setCurrentAlumnos(updatedAlumnos);
  };

  const handleEntregadosChange = (index: number) => {
    const updatedAlumnos = [...renderAlumnos()];
    updatedAlumnos[index].entregados = !updatedAlumnos[index].entregados;
    setCurrentAlumnos(updatedAlumnos);
  };

  const handleComunicacionesChange = (index: number) => {
    const updatedAlumnos = [...renderAlumnos()];
    updatedAlumnos[index].comunicaciones = !updatedAlumnos[index].comunicaciones;
    setCurrentAlumnos(updatedAlumnos);
  };

  const handleDelete = (index: number) => {
    const updatedAlumnos = [...renderAlumnos()];
    updatedAlumnos.splice(index, 1);
    setCurrentAlumnos(updatedAlumnos);
  };

  const renderAlumnos = () => {
    switch (selectedCurso) {
      case '6º1':
        return alumnos;
      case '6º2':
        return alumnos2;
      case '6º3':
        return alumnos3;
      case '6º4':
        return alumnos4;
      default:
        return [];
    }
 };

  const setCurrentAlumnos = (updatedAlumnos: Alumno[]) => {
    switch (selectedCurso) {
      case '6º1':
        setAlumnos(updatedAlumnos);
        break;
      case '6º2':
        setAlumnos2(updatedAlumnos);
        break;
      case '6º3':
        setAlumnos3(updatedAlumnos);
        break;
      case '6º4':
        setAlumnos4(updatedAlumnos);
        break;
      default:
        break;
    }
  };

  const filteredAlumnos = renderAlumnos().filter(alumno =>
    alumno.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMateriasMenu = () => {
    setShowMateriasMenu(!showMateriasMenu);
  };

  const toggleCursosMenu = () => {
    setShowCursosMenu(!showCursosMenu);
  };

  const handleCursoChange = (curso: string) => {
    setSelectedCurso(curso);
    setSearchQuery('');  // Limpiar búsqueda al cambiar de curso
  };

  const handleAddCurso = async () => {
    try {
      const cursoRef = collection(db, 'cursos');
      await addDoc(cursoRef, { nombre: cursoToAdd });
      console.log('Curso added with ID: ${cursoToAdd}');
    } catch (error) {
      console.error('Error adding curso: ${error}');
    }
  };

  const handleAddAlumno = async () => {
    try {
      const cursoId = selectedCurso; // Get the selected curso ID
      const alumnoRef = collection(db, 'cursos/${cursoId}/alumnos');
      await addDoc(alumnoRef, { nombre: alumnoToAdd });
      console.log('Alumno added to curso ${cursoId} with ID: ${alumnoToAdd}');
    } catch (error) {
      console.error('Error adding alumno to curso ${cursoId}: ${error}');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Seguimiento de Alumnos</Text>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filtros</Text>
            <View style={styles.filterIcons}>
              <TouchableOpacity style={styles.filterIcon} onPress={toggleCursosMenu}>
                <Text style={styles.filterIconText}>Cursos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterIcon} onPress={toggleMateriasMenu}>
                <Text style={styles.filterIconText}>Materias</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.content}>
        <View style={styles.contentWrapper}>
          <Text style={styles.sectionTitle}>{` ${selectedCurso}/alumnos`}</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar alumnos..."
              onChangeText={handleSearch}
              value={searchQuery}
            />
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Alumnos</Text>
              <Text style={styles.tableHeaderText}>Comentario</Text>
              <Text style={styles.tableHeaderText}>Notas</Text>
              <Text style={styles.tableHeaderText}>Trabajos</Text>
              <Text style={styles.tableHeaderText}>Cuaderno de Comunicaciones</Text>
            </View>
            <View style={styles.tableBody}>
              <FlatList
                data={filteredAlumnos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableRowText}>{item.nombre}</Text>
                    <TextInput
                      style={styles.tableRowInput}
                      placeholder="Comentario"
                      onChangeText={(text) => handleCommentChange(index, text)}
                      value={item.comentario}
                    />
                    <TouchableOpacity style={styles.tableRowButton} onPress={() => handleAprobadoChange(index)}>
                      <Text style={styles.tableRowButtonText}>{item.aprobado ? 'Aprobado' : 'No Aprobado'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tableRowButton} onPress={() => handleEntregadosChange(index)}>
                      <Text style={styles.tableRowButtonText}>{item.entregados ? 'Entregados' : 'No Entregados'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tableRowButton} onPress={() => handleComunicacionesChange(index)}>
                      <Text style={styles.tableRowButtonText}>{item.comunicaciones ? 'Si' : 'No'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
                      <Text style={styles.deleteButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {showMateriasMenu && (
        <View style={styles.materiasMenu}>
          <Text style={styles.materiaItem}>Matemática</Text>
          <Text style={styles.materiaItem}>Historia</Text>
          <Text style={styles.materiaItem}>Lengua</Text>
        </View>
      )}
      {showCursosMenu && (
        <View style={styles.cursosMenu}>
          <TouchableOpacity style={styles.cursoItem} onPress={() => handleCursoChange('6º1')}>
            <Text style={styles.cursoItemText}>6º1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cursoItem} onPress={() => handleCursoChange('6º2')}>
            <Text style={styles.cursoItemText}>6º2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cursoItem} onPress={() => handleCursoChange('6º3')}>
            <Text style={styles.cursoItemText}>6º3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cursoItem} onPress={() => handleCursoChange('6º4')}>
            <Text style={styles.cursoItemText}>6º4</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddCurso}>
          <Text style={styles.buttonText}>Add Curso</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Curso name"
          value={cursoToAdd}
          onChangeText={(text) => setCursoToAdd(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddAlumno}>
          <Text style={styles.buttonText}>Add Alumno</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Alumno name"
          value={alumnoToAdd}
          onChangeText={(text) => setAlumnoToAdd(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#7fffd4',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    margin:  10,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  filterIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    elevation: 2,
  },
  filterIconText: {
    color: '#000',
  },
  content: {
    padding: 20,
  },
  contentWrapper: {
    flex: 1, 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#B2DFEE',
    padding: 10,
    marginBottom: 10
  },
  tableBody: {
    marginBottom: 10
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRowText: {
    flex: 1,
  },
  tableRowInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  tableRowButton: {
    flex: 1,
    backgroundColor: '#7FFFD4',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  tableRowButtonText: {
    color: '#000000',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  materiasMenu: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: '#E0FFFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  materiaItem: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#000',
  },
  cursosMenu: {
    position: 'absolute',
    top: 80,
    right: 125,
    backgroundColor: '#E0FFFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  cursoItem: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#000',
  },
  cursoItemText: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default AlumnosScreen;