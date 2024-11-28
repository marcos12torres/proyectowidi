import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground, Modal, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';
import { collection, addDoc, deleteDoc, doc, getFirestore, getDocs, query } from 'firebase/firestore';
import { app } from '../app/auth/firebase';

const { width } = Dimensions.get('window');
const db = getFirestore(app);

interface Miembro {
  id?: string;
  nombre: string;
  cargo: string;
  años: number;
}

interface Logro {
  id?: string;
  año: string;
  descripcion: string;
}

interface Proyecto {
  id?: string;
  titulo: string;
  descripcion: string;
}

interface Curso {
  id?: string;
  titulo: string;
  duracion: string;
  modalidad: string;
  horario: string;
  descripcion: string;
}

interface InfoGeneral {
  añoFundacion: number;
  historia: string;
  mision: string;
  vision: string;
}
const AcercaDeNosotros = () => {
  // Estados principales
  const [equipo, setEquipo] = useState<Miembro[]>([]);
  const [logros, setLogros] = useState<Logro[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [cursosTemporales, setCursosTemporales] = useState<Curso[]>([]);
  const [infoGeneral, setInfoGeneral] = useState<InfoGeneral>({
    añoFundacion: 1990,
    historia: 'Cargando...',
    mision: 'Cargando...',
    vision: 'Cargando...'
  });

  // Estados para modales
  const [modalMiembroVisible, setModalMiembroVisible] = useState(false);
  const [modalLogroVisible, setModalLogroVisible] = useState(false);
  const [modalProyectoVisible, setModalProyectoVisible] = useState(false);
  const [modalCursoVisible, setModalCursoVisible] = useState(false);

  // Estados para nuevos elementos
  const [nuevoMiembro, setNuevoMiembro] = useState<Miembro>({
    nombre: '',
    cargo: '',
    años: 0
  });

  const [nuevoLogro, setNuevoLogro] = useState<Logro>({
    año: '',
    descripcion: ''
  });

  const [nuevoProyecto, setNuevoProyecto] = useState<Proyecto>({
    titulo: '',
    descripcion: ''
  });

  const [nuevoCurso, setNuevoCurso] = useState<Curso>({
    titulo: '',
    duracion: '',
    modalidad: '',
    horario: '',
    descripcion: ''
  });
    // Funciones CRUD para equipo directivo
    const agregarMiembroEquipo = async (miembro: Miembro): Promise<string> => {
      try {
        console.log('Intentando agregar miembro:', miembro);
        const docRef = await addDoc(collection(db, 'equipo'), miembro);
        console.log('Miembro agregado con ID:', docRef.id);
        await cargarDatos();
        return docRef.id;
      } catch (error) {
        console.error('Error al agregar miembro:', error);
        throw error;
      }
    };
  
    const eliminarMiembroEquipo = async (id: string): Promise<void> => {
      try {
        await deleteDoc(doc(db, 'equipo', id));
        await cargarDatos();
      } catch (error) {
        console.error('Error al eliminar miembro:', error);
        throw error;
      }
    };
  
    // Funciones CRUD para logros
    const agregarLogro = async (logro: Logro): Promise<string> => {
      try {
        const docRef = await addDoc(collection(db, 'logros'), logro);
        await cargarDatos();
        return docRef.id;
      } catch (error) {
        console.error('Error al agregar logro:', error);
        throw error;
      }
    };
  
    const eliminarLogro = async (id: string): Promise<void> => {
      try {
        await deleteDoc(doc(db, 'logros', id));
        await cargarDatos();
      } catch (error) {
        console.error('Error al eliminar logro:', error);
        throw error;
      }
    };
  
    // Funciones CRUD para proyectos
    const agregarProyecto = async (proyecto: Proyecto): Promise<string> => {
      try {
        const docRef = await addDoc(collection(db, 'proyectos'), proyecto);
        await cargarDatos();
        return docRef.id;
      } catch (error) {
        console.error('Error al agregar proyecto:', error);
        throw error;
      }
    };
  
    const eliminarProyecto = async (id: string): Promise<void> => {
      try {
        await deleteDoc(doc(db, 'proyectos', id));
        await cargarDatos();
      } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        throw error;
      }
    };
  
    // Funciones CRUD para cursos temporales
    const agregarCurso = async (curso: Curso): Promise<string> => {
      try {
        const docRef = await addDoc(collection(db, 'cursosTemporales'), curso);
        await cargarDatos();
        return docRef.id;
      } catch (error) {
        console.error('Error al agregar curso:', error);
        throw error;
      }
    };
  
    const eliminarCurso = async (id: string): Promise<void> => {
      try {
        await deleteDoc(doc(db, 'cursosTemporales', id));
        await cargarDatos();
      } catch (error) {
        console.error('Error al eliminar curso:', error);
        throw error;
      }
    };
      // Función para cargar datos
  const cargarDatos = async () => {
    try {
      // Cargar equipo
      const equipoQuery = query(collection(db, 'equipo'));
      const equipoSnapshot = await getDocs(equipoQuery);
      const equipoData = equipoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as unknown as Miembro));
      console.log('Datos del equipo cargados:', equipoData);
      setEquipo(equipoData);

      // Cargar logros
      const logrosSnapshot = await getDocs(query(collection(db, 'logros')));
      const logrosData = logrosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as unknown as Logro));
      setLogros(logrosData);

      // Cargar proyectos
      const proyectosSnapshot = await getDocs(query(collection(db, 'proyectos')));
      const proyectosData = proyectosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as unknown as Proyecto));
      setProyectos(proyectosData);

      // Cargar cursos temporales
      const cursosSnapshot = await getDocs(query(collection(db, 'cursosTemporales')));
      const cursosData = cursosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as unknown as Curso));
      setCursosTemporales(cursosData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  // Handlers para los botones
  const handleAgregarMiembro = async () => {
    try {
      if (nuevoMiembro.nombre && nuevoMiembro.cargo) {
        await agregarMiembroEquipo(nuevoMiembro);
        setModalMiembroVisible(false);
        setNuevoMiembro({ nombre: '', cargo: '', años: 0 });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAgregarLogro = async () => {
    try {
      if (nuevoLogro.año && nuevoLogro.descripcion) {
        await agregarLogro(nuevoLogro);
        setModalLogroVisible(false);
        setNuevoLogro({ año: '', descripcion: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAgregarProyecto = async () => {
    try {
      if (nuevoProyecto.titulo && nuevoProyecto.descripcion) {
        await agregarProyecto(nuevoProyecto);
        setModalProyectoVisible(false);
        setNuevoProyecto({ titulo: '', descripcion: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAgregarCurso = async () => {
    try {
      if (nuevoCurso.titulo && nuevoCurso.descripcion) {
        await agregarCurso(nuevoCurso);
        setModalCursoVisible(false);
        setNuevoCurso({
          titulo: '',
          duracion: '',
          modalidad: '',
          horario: '',
          descripcion: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log('Estado del equipo actualizado:', equipo);
  }, [equipo]);

  return (
    <>
      {/* Modal para Agregar Miembro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMiembroVisible}
        onRequestClose={() => setModalMiembroVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Agregar Nuevo Miembro</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nuevoMiembro.nombre}
              onChangeText={(text) => setNuevoMiembro({...nuevoMiembro, nombre: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Cargo"
              value={nuevoMiembro.cargo}
              onChangeText={(text) => setNuevoMiembro({...nuevoMiembro, cargo: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Años de experiencia"
              keyboardType="numeric"
              value={nuevoMiembro.años.toString()}
              onChangeText={(text) => setNuevoMiembro({...nuevoMiembro, años: parseInt(text) || 0})}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalMiembroVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleAgregarMiembro}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Agregar Logro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLogroVisible}
        onRequestClose={() => setModalLogroVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Agregar Nuevo Logro</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Año"
              value={nuevoLogro.año}
              onChangeText={(text) => setNuevoLogro({...nuevoLogro, año: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={nuevoLogro.descripcion}
              onChangeText={(text) => setNuevoLogro({...nuevoLogro, descripcion: text})}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalLogroVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleAgregarLogro}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
            {/* Modal para Agregar Proyecto */}
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalProyectoVisible}
        onRequestClose={() => setModalProyectoVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Agregar Nuevo Proyecto</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={nuevoProyecto.titulo}
              onChangeText={(text) => setNuevoProyecto({...nuevoProyecto, titulo: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={nuevoProyecto.descripcion}
              onChangeText={(text) => setNuevoProyecto({...nuevoProyecto, descripcion: text})}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalProyectoVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleAgregarProyecto}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Agregar Curso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCursoVisible}
        onRequestClose={() => setModalCursoVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Agregar Nuevo Curso</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={nuevoCurso.titulo}
              onChangeText={(text) => setNuevoCurso({...nuevoCurso, titulo: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Duración"
              value={nuevoCurso.duracion}
              onChangeText={(text) => setNuevoCurso({...nuevoCurso, duracion: text})}
            />

            <TextInput
              style={styles.input}
              placeholder="Modalidad"
              value={nuevoCurso.modalidad}
              onChangeText={(text) => setNuevoCurso({...nuevoCurso, modalidad: text})}
            />

            <TextInput
              style={styles.input}
              placeholder="Horario"
              value={nuevoCurso.horario}
              onChangeText={(text) => setNuevoCurso({...nuevoCurso, horario: text})}
            />

            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={nuevoCurso.descripcion}
              onChangeText={(text) => setNuevoCurso({...nuevoCurso, descripcion: text})}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalCursoVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleAgregarCurso}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
        {/* Información General */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información General</Text>
          <Text style={styles.infoText}>Año de Fundación: {infoGeneral.añoFundacion}</Text>
          <Text style={styles.infoText}>Historia: {infoGeneral.historia}</Text>
          <Text style={styles.infoText}>Misión: {infoGeneral.mision}</Text>
          <Text style={styles.infoText}>Visión: {infoGeneral.vision}</Text>
        </View>

        {/* Botones de administración */}
        <View style={styles.adminSection}>
          <Text style={styles.sectionTitle}>Administración</Text>
          
          {/* Equipo */}
          <View style={styles.adminGroup}>
            <Text style={styles.adminGroupTitle}>Equipo Directivo</Text>
            <TouchableOpacity 
              style={styles.adminButton}
              onPress={() => setModalMiembroVisible(true)}
            >
              <Text style={styles.adminButtonText}>Agregar Miembro</Text>
            </TouchableOpacity>
            {equipo.map((miembro, index) => (
              <View key={index} style={styles.adminItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{miembro.nombre}</Text>
                  <Text style={styles.itemSubtitle}>{miembro.cargo}</Text>
                  <Text style={styles.itemDetail}>{miembro.años} años de experiencia</Text>
                </View>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => eliminarMiembroEquipo(miembro.id!)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Logros */}
          <View style={styles.adminGroup}>
            <Text style={styles.adminGroupTitle}>Logros</Text>
            <TouchableOpacity 
              style={styles.adminButton}
              onPress={() => setModalLogroVisible(true)}
            >
              <Text style={styles.adminButtonText}>Agregar Logro</Text>
            </TouchableOpacity>
            {logros.map((logro, index) => (
              <View key={index} style={styles.adminItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{logro.año}</Text>
                  <Text style={styles.itemSubtitle}>{logro.descripcion}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => eliminarLogro(logro.id!)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Proyectos */}
          <View style={styles.adminGroup}>
            <Text style={styles.adminGroupTitle}>Proyectos</Text>
            <TouchableOpacity 
              style={styles.adminButton}
              onPress={() => setModalProyectoVisible(true)}
            >
              <Text style={styles.adminButtonText}>Agregar Proyecto</Text>
            </TouchableOpacity>
            {proyectos.map((proyecto, index) => (
              <View key={index} style={styles.adminItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{proyecto.titulo}</Text>
                  <Text style={styles.itemSubtitle}>{proyecto.descripcion}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => eliminarProyecto(proyecto.id!)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Cursos */}
          <View style={styles.adminGroup}>
            <Text style={styles.adminGroupTitle}>Cursos Temporales</Text>
            <TouchableOpacity 
              style={styles.adminButton}
              onPress={() => setModalCursoVisible(true)}
            >
              <Text style={styles.adminButtonText}>Agregar Curso</Text>
            </TouchableOpacity>
            {cursosTemporales.map((curso, index) => (
              <View key={index} style={styles.adminItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{curso.titulo}</Text>
                  <Text style={styles.itemSubtitle}>{curso.modalidad} - {curso.duracion}</Text>
                  <Text style={styles.itemDetail}>{curso.horario}</Text>
                  <Text style={styles.itemDetail}>{curso.descripcion}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => eliminarCurso(curso.id!)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2c3e50',
    lineHeight: 24,
  },
  adminSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  adminGroup: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adminGroupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#34495e',
  },
  adminButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  adminButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  adminItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  itemDetail: {
    fontSize: 12,
    color: '#95a5a6',
  },
  deleteButton: {
    padding: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    minWidth: 120,
  },
  buttonConfirm: {
    backgroundColor: '#2ecc71',
  },
  buttonCancel: {
    backgroundColor: '#e74c3c',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AcercaDeNosotros;