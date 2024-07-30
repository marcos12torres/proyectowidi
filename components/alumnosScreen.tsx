import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';

interface Alumno {
  nombre: string;
  comentario: string;
  aprobado: boolean;
  entregados: boolean;
  comunicaciones: boolean;
}

const AlumnosScreen: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([
    { nombre: 'Pepito Juarez...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'sandra martines...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'esteban quito...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'mema mosiempre...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'fito paez...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'sara Juarez...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'sisi popo...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'cacahuate pipi...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'sarza tete...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
    { nombre: 'paloma...', comentario: '', aprobado: false, entregados: false, comunicaciones: false },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMateriasMenu, setShowMateriasMenu] = useState<boolean>(false);
  const [showCursosMenu, setShowCursosMenu] = useState<boolean>(false);

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>seguimiento alumnos</Text>
          <View style={styles.taskApp}>
            <Text style={styles.taskAppText}>filtros</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity style={styles.icon} onPress={toggleCursosMenu}>
                <Text style={styles.iconText}>cursos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={toggleMateriasMenu}>
                <Text style={styles.iconText}>materias</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>6°1/alumnos</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar alumnos..."
              onChangeText={handleSearch}
              value={searchQuery}
            />
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Alumnos</Text>
              <Text style={styles.tableHeaderText}>Comentario</Text>
              <Text style={styles.tableHeaderText}>Notas</Text>
              <Text style={styles.tableHeaderText}>Trabajos</Text>
              <Text style={styles.tableHeaderText}>Cuaderno de Comunicaciones</Text>
              <View style={styles.deleteIcon}></View>
            </View>
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
      </ScrollView>
      {showMateriasMenu && (
        <View style={styles.materiasMenu}>
          <Text style={styles.materiaItem}>Matematica</Text>
          <Text style={styles.materiaItem}>Historia</Text>
          <Text style={styles.materiaItem}>Lengua</Text>
        </View>
      )}
      {showCursosMenu && (
        <View style={styles.cursosMenu}>
          <Text style={styles.cursoItem}>6º1</Text>
          <Text style={styles.cursoItem}>6º2</Text>
          <Text style={styles.cursoItem}>6º3</Text>
          <Text style={styles.cursoItem}>6º4</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    zIndex: 1, // Asegura que el contenido del ScrollView esté detrás de los menús
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  taskApp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskAppText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    elevation: 2,
  },
  iconText: {
    color: '#000',
  },
  materiasMenu: {
    position: 'absolute',
    top: 80, // Ajusta esta propiedad según sea necesario para que el menú aparezca justo debajo del botón "materias"
    right: 20,
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
    top: 80, // Ajusta esta propiedad según sea necesario para que el menú aparezca justo debajo del botón "cursos"
    right: 125, // Ajusta esta propiedad para desplazar el menú un poco más a la izquierda
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
  content: {
    padding: 20,
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
  filterButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#B2DFEE',
    padding: 10,
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
  deleteIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#f44336',
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default AlumnosScreen;
