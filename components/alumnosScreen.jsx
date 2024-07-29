import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';

const App = () => {
  const [alumnos, setAlumnos] = useState([
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

  const [searchQuery, setSearchQuery] = useState('');
  const [showMateriasMenu, setShowMateriasMenu] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCommentChange = (index, text) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].comentario = text;
    setAlumnos(updatedAlumnos);
  };

  const handleAprobadoChange = (index) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].aprobado = !updatedAlumnos[index].aprobado;
    setAlumnos(updatedAlumnos);
  };

  const handleEntregadosChange = (index) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].entregados = !updatedAlumnos[index].entregados;
    setAlumnos(updatedAlumnos);
  };

  const handleComunicacionesChange = (index) => {
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].comunicaciones = !updatedAlumnos[index].comunicaciones;
    setAlumnos(updatedAlumnos);
  };

  const handleDelete = (index) => {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>seguimiento alumnos</Text>
        <View style={styles.taskApp}>
          <Text style={styles.taskAppText}>filtros</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.icon}>
              <Text style={styles.iconText}>cursos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={toggleMateriasMenu}>
              <Text style={styles.iconText}>materias</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showMateriasMenu && (
          <View style={styles.materiasMenu}>
            <Text style={styles.materiaItem}>Matematica</Text>
            <Text style={styles.materiaItem}>Historia</Text>
            <Text style={styles.materiaItem}>Lengua</Text>
          </View>
        )}
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
    zIndex: 1, // Make sure the search container is below the materias menu
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
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  tableRowButtonText: {
    color: '#fff',
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

export default App;
