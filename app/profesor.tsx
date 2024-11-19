import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../auth/firebase';

interface Alumno {
  id: string;
  nombre: string;
  comentario: string;
  aprobado: boolean;
  entregados: boolean;
  comunicaciones: boolean;
}

const AlumnosScreen: React.FC = () => {
  const cursosPredefenidos = ['6º1', '6º2', '6º3', '6º4'];
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [cursos, setCursos] = useState<string[]>(cursosPredefenidos);
  const [selectedCurso, setSelectedCurso] = useState('6º1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMateriasMenu, setShowMateriasMenu] = useState<boolean>(false);
  const [showCursosMenu, setShowCursosMenu] = useState<boolean>(false);
  const [cursoToAdd, setCursoToAdd] = useState('');
  const [alumnoToAdd, setAlumnoToAdd] = useState('');

  useEffect(() => {
    const cursosRef = collection(db, 'cursos');
    const unsubscribe = onSnapshot(cursosRef, (snapshot) => {
      const cursosNuevos = snapshot.docs.map(doc => doc.data().nombre);
      const todosCursos = [...cursosPredefenidos, ...cursosNuevos];
      // Eliminar duplicados si existieran
      const cursosUnicos = [...new Set(todosCursos)];
      setCursos(cursosUnicos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, `cursos/${selectedCurso}/alumnos`),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const alumnosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Alumno[];
      setAlumnos(alumnosData);
    });

    return () => unsubscribe();
  }, [selectedCurso]);
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleCommentChange = (index: number, text: string) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].comentario = text;
    setAlumnos(updatedAlumnos);
  };

  const handleAprobadoChange = (index: number) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].aprobado = !updatedAlumnos[index].aprobado;
    setAlumnos(updatedAlumnos);
  };

  const handleEntregadosChange = (index: number) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].entregados = !updatedAlumnos[index].entregados;
    setAlumnos(updatedAlumnos);
  };

  const handleComunicacionesChange = (index: number) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].comunicaciones = !updatedAlumnos[index].comunicaciones;
    setAlumnos(updatedAlumnos);
  };

  const handleDelete = (index: number) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos.splice(index, 1);
    setAlumnos(updatedAlumnos);
  };

  const filteredAlumnos = alumnos.filter(alumno =>
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
    setSearchQuery('');
    setShowCursosMenu(false); // Cerrar el menú después de seleccionar
  };

  const handleAddCurso = async () => {
    try {
      const cursoRef = collection(db, 'cursos');
      const cursoData = {
        nombre: cursoToAdd,
        createdAt: serverTimestamp(),
        alumnos: []
      };
      
      await addDoc(cursoRef, cursoData);
      console.log(`Curso agregado: ${cursoToAdd}`);
      setCursoToAdd('');
    } catch (error) {
      console.error(`Error al agregar curso: ${error}`);
    }
  };

  const handleAddAlumno = async () => {
    try {
      const alumnoData = {
        nombre: alumnoToAdd,
        comentario: '',
        aprobado: false,
        entregados: false,
        comunicaciones: false,
        createdAt: serverTimestamp()
      };
      
      const alumnoRef = collection(db, `cursos/${selectedCurso}/alumnos`);
      await addDoc(alumnoRef, alumnoData);
      console.log(`Alumno agregado a ${selectedCurso}: ${alumnoToAdd}`);
      setAlumnoToAdd('');
    } catch (error) {
      console.error(`Error al agregar alumno: ${error}`);
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
          {cursos.map((curso) => (
            <TouchableOpacity 
              key={curso} 
              style={styles.cursoItem} 
              onPress={() => handleCursoChange(curso)}
            >
              <Text style={styles.cursoItemText}>{curso}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddCurso}>
          <Text style={styles.buttonText}>agregar Curso</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="nombre del curso"
          value={cursoToAdd}
          onChangeText={(text) => setCursoToAdd(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddAlumno}>
          <Text style={styles.buttonText}>guardar Alumno</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="nombre del alumno"
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
    margin: 10,
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
    padding: 10,
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