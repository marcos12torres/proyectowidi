import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground, Modal, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';
import { collection, addDoc, deleteDoc, doc, getFirestore, getDocs, query, updateDoc, orderBy } from 'firebase/firestore';
import { app } from '../app/auth/firebase';

const { width } = Dimensions.get('window');
const db = getFirestore(app);

interface Miembro {
  id?: string;
  nombre: string;
  cargo: string;
  años: number;
  createdAt?: string;
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

  // Estados para edición
  const [editandoMiembro, setEditandoMiembro] = useState<Miembro | null>(null);
  const [editandoLogro, setEditandoLogro] = useState<Logro | null>(null);
  const [editandoProyecto, setEditandoProyecto] = useState<Proyecto | null>(null);
  const [editandoCurso, setEditandoCurso] = useState<Curso | null>(null);
  
  // Estados para modales de edición
  const [modalEditMiembroVisible, setModalEditMiembroVisible] = useState(false);
  const [modalEditLogroVisible, setModalEditLogroVisible] = useState(false);
  const [modalEditProyectoVisible, setModalEditProyectoVisible] = useState(false);
  const [modalEditCursoVisible, setModalEditCursoVisible] = useState(false);

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
        const docRef = await addDoc(collection(db, 'equipo'), {
          ...miembro,
          createdAt: new Date().toISOString()
        });
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
  
    const editarMiembroEquipo = async (id: string, miembroActualizado: Miembro): Promise<void> => {
      try {
        await updateDoc(doc(db, 'equipo', id), { ...miembroActualizado });
        await cargarDatos();
        setModalEditMiembroVisible(false);
        setEditandoMiembro(null);
      } catch (error) {
        console.error('Error al editar miembro:', error);
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
  
    const editarLogro = async (id: string, logroActualizado: Logro): Promise<void> => {
      try {
        await updateDoc(doc(db, 'logros', id), { ...logroActualizado });
        await cargarDatos();
        setModalEditLogroVisible(false);
        setEditandoLogro(null);
      } catch (error) {
        console.error('Error al editar logro:', error);
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
  
    const editarProyecto = async (id: string, proyectoActualizado: Proyecto): Promise<void> => {
      try {
        await updateDoc(doc(db, 'proyectos', id), { ...proyectoActualizado });
        await cargarDatos();
        setModalEditProyectoVisible(false);
        setEditandoProyecto(null);
      } catch (error) {
        console.error('Error al editar proyecto:', error);
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
  
    const editarCurso = async (id: string, cursoActualizado: Curso): Promise<void> => {
      try {
        await updateDoc(doc(db, 'cursosTemporales', id), { ...cursoActualizado });
        await cargarDatos();
        setModalEditCursoVisible(false);
        setEditandoCurso(null);
      } catch (error) {
        console.error('Error al editar curso:', error);
        throw error;
      }
    };
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

  const handleEditarMiembro = async () => {
    try {
      if (editandoMiembro && editandoMiembro.id) {
        await editarMiembroEquipo(editandoMiembro.id, editandoMiembro);
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

  const handleEditarLogro = async () => {
    try {
      if (editandoLogro && editandoLogro.id) {
        await editarLogro(editandoLogro.id, editandoLogro);
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

  const handleEditarProyecto = async () => {
    try {
      if (editandoProyecto && editandoProyecto.id) {
        await editarProyecto(editandoProyecto.id, editandoProyecto);
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

  const handleEditarCurso = async () => {
    try {
      if (editandoCurso && editandoCurso.id) {
        await editarCurso(editandoCurso.id, editandoCurso);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para cargar datos
  const cargarDatos = async () => {
    try {
      // Cargar equipo ordenado por fecha de más nuevo a más viejo
      const equipoQuery = query(
        collection(db, 'equipo'),
        orderBy('createdAt', 'desc')  // Ordenar por fecha descendente
      );
      const equipoSnapshot = await getDocs(equipoQuery);
      const equipoData = equipoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as unknown as Miembro));
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

  // Monitorear cambios en el estado del equipo
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

      {/* Modal para Editar Miembro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditMiembroVisible}
        onRequestClose={() => setModalEditMiembroVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Editar Miembro</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={editandoMiembro?.nombre || ''}
              onChangeText={(text) => setEditandoMiembro(prev => prev ? {...prev, nombre: text} : null)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Cargo"
              value={editandoMiembro?.cargo || ''}
              onChangeText={(text) => setEditandoMiembro(prev => prev ? {...prev, cargo: text} : null)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Años de experiencia"
              keyboardType="numeric"
              value={editandoMiembro?.años.toString() || ''}
              onChangeText={(text) => setEditandoMiembro(prev => prev ? {...prev, años: parseInt(text) || 0} : null)}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalEditMiembroVisible(false);
                  setEditandoMiembro(null);
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleEditarMiembro}
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
      

      {/* Modal para Editar Logro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditLogroVisible}
        onRequestClose={() => setModalEditLogroVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Editar Logro</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Año"
              value={editandoLogro?.año || ''}
              onChangeText={(text) => setEditandoLogro(prev => prev ? {...prev, año: text} : null)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={editandoLogro?.descripcion || ''}
              onChangeText={(text) => setEditandoLogro(prev => prev ? {...prev, descripcion: text} : null)}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalEditLogroVisible(false);
                  setEditandoLogro(null);
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleEditarLogro}
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

      {/* Modal para Editar Proyecto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditProyectoVisible}
        onRequestClose={() => setModalEditProyectoVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Editar Proyecto</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={editandoProyecto?.titulo || ''}
              onChangeText={(text) => setEditandoProyecto(prev => prev ? {...prev, titulo: text} : null)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={editandoProyecto?.descripcion || ''}
              onChangeText={(text) => setEditandoProyecto(prev => prev ? {...prev, descripcion: text} : null)}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalEditProyectoVisible(false);
                  setEditandoProyecto(null);
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleEditarProyecto}
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

      {/* Modal para Editar Curso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditCursoVisible}
        onRequestClose={() => setModalEditCursoVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Editar Curso</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={editandoCurso?.titulo || ''}
              onChangeText={(text) => setEditandoCurso(prev => prev ? {...prev, titulo: text} : null)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Duración"
              value={editandoCurso?.duracion || ''}
              onChangeText={(text) => setEditandoCurso(prev => prev ? {...prev, duracion: text} : null)}
            />

            <TextInput
              style={styles.input}
              placeholder="Modalidad"
              value={editandoCurso?.modalidad || ''}
              onChangeText={(text) => setEditandoCurso(prev => prev ? {...prev, modalidad: text} : null)}
            />

            <TextInput
              style={styles.input}
              placeholder="Horario"
              value={editandoCurso?.horario || ''}
              onChangeText={(text) => setEditandoCurso(prev => prev ? {...prev, horario: text} : null)}
            />

            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={editandoCurso?.descripcion || ''}
              onChangeText={(text) => setEditandoCurso(prev => prev ? {...prev, descripcion: text} : null)}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalEditCursoVisible(false);
                  setEditandoCurso(null);
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleEditarCurso}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        {/* Banner Principal */}
        <ImageBackground 
          source={require('../app/img/edificio-escolar.png')} 
          style={styles.banner}
        >
          <View style={styles.overlay}>
            <Image source={require('../app/img/logo.png')} style={styles.logo} />
            <Text style={styles.mainTitle}>Nuestra Historia Educativa</Text>
            <Text style={styles.subTitle}>Formando líderes desde {infoGeneral.añoFundacion}</Text>
          </View>
        </ImageBackground>

        {/* Historia y Valores */}
        <View style={styles.infoSection}>
          <Card style={styles.historiaCard}>
            <Card.Content style={styles.historiaContent}>
              <Title style={styles.historiaTitulo}>Nuestra Historia</Title>
              <Paragraph style={styles.historiaTexto}>{infoGeneral.historia}</Paragraph>
            </Card.Content>
          </Card>
          
          <View style={styles.valoresContainer}>
            <Card style={styles.valorCard}>
              <Card.Content>
                <Title>Misión</Title>
                <Paragraph>{infoGeneral.mision}</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.valorCard}>
              <Card.Content>
                <Title>Visión</Title>
                <Paragraph>{infoGeneral.vision}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Nuestro Equipo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuestro Equipo Directivo</Text>
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={() => setModalMiembroVisible(true)}
          >
            <Text style={styles.adminButtonText}>Agregar Miembro</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {equipo.map((miembro, index) => (
              <View key={index} style={styles.equipoCard}>
                <Image source={require('../app/img/user.png')} style={styles.equipoFoto} />
                <Text style={styles.equipoNombre}>{miembro.nombre}</Text>
                <Text style={styles.equipoCargo}>{miembro.cargo}</Text>
                <Text style={styles.equipoAños}>{miembro.años} años en la institución</Text>
                <View style={styles.cardButtons}>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => {
                      setEditandoMiembro(miembro);
                      setModalEditMiembroVisible(true);
                    }}
                  >
                    <MaterialIcons name="edit" size={24} color="#2ecc71" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => eliminarMiembroEquipo(miembro.id!)}
                  >
                    <MaterialIcons name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Logros y Reconocimientos */}
        <View style={styles.logrosSection}>
          <Text style={styles.sectionTitle}>Logros y Reconocimientos</Text>
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={() => setModalLogroVisible(true)}
          >
            <Text style={styles.adminButtonText}>Agregar Logro</Text>
          </TouchableOpacity>
          {logros.map((logro, index) => (
            <View key={index} style={styles.logroCard}>
              <Text style={styles.logroAño}>{logro.año}</Text>
              <Text style={styles.logroDesc}>{logro.descripcion}</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => {
                    setEditandoLogro(logro);
                    setModalEditLogroVisible(true);
                  }}
                >
                  <MaterialIcons name="edit" size={24} color="#2ecc71" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => eliminarLogro(logro.id!)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

                {/* Proyectos Actuales */}
                <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proyectos Actuales</Text>
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={() => setModalProyectoVisible(true)}
          >
            <Text style={styles.adminButtonText}>Agregar Proyecto</Text>
          </TouchableOpacity>
          {proyectos.map((proyecto, index) => (
            <View key={index} style={styles.proyectoCard}>
              <Text style={styles.proyectoTitle}>{proyecto.titulo}</Text>
              <Text style={styles.proyectoDesc}>{proyecto.descripcion}</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => {
                    setEditandoProyecto(proyecto);
                    setModalEditProyectoVisible(true);
                  }}
                >
                  <MaterialIcons name="edit" size={24} color="#2ecc71" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => eliminarProyecto(proyecto.id!)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Cursos Temporales */}
        <View style={styles.cursosSection}>
          <Text style={styles.sectionTitle}>Cursos Temporales</Text>
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={() => setModalCursoVisible(true)}
          >
            <Text style={styles.adminButtonText}>Agregar Curso</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cursosTemporales.map((curso, index) => (
              <View key={index} style={styles.cursoCard}>
                <View style={styles.cursoHeader}>
                  <Text style={styles.cursoTitulo}>{curso.titulo}</Text>
                  <View style={styles.modalidadBadge}>
                    <Text style={styles.modalidadText}>{curso.modalidad}</Text>
                  </View>
                </View>
                <Text style={styles.cursoDuracion}>Duración: {curso.duracion}</Text>
                <Text style={styles.cursoHorario}>Horario: {curso.horario}</Text>
                <Text style={styles.cursoDescripcion}>{curso.descripcion}</Text>
                <View style={styles.cardButtons}>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => {
                      setEditandoCurso(curso);
                      setModalEditCursoVisible(true);
                    }}
                  >
                    <MaterialIcons name="edit" size={24} color="#2ecc71" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => eliminarCurso(curso.id!)}
                  >
                    <MaterialIcons name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Redes Sociales */}
        <View style={styles.redesSection}>
          <Text style={styles.sectionTitle}>Síguenos en Redes</Text>
          <View style={styles.redesContainer}>
            <TouchableOpacity style={styles.redSocialBtn}>
              <FontAwesome5 name="facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.redSocialBtn}>
              <FontAwesome5 name="instagram" size={24} color="#c13584" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.redSocialBtn}>
              <FontAwesome5 name="twitter" size={24} color="#1da1f2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contacto */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          <View style={styles.contactInfo}>
            <MaterialIcons name="location-on" size={24} color="#2c3e50" />
            <Text style={styles.contactText}>Av. Principal 123, Ciudad</Text>
          </View>
          <View style={styles.contactInfo}>
            <MaterialIcons name="phone" size={24} color="#2c3e50" />
            <Text style={styles.contactText}>(123) 456-7890</Text>
          </View>
          <View style={styles.contactInfo}>
            <MaterialIcons name="email" size={24} color="#2c3e50" />
            <Text style={styles.contactText}>contacto@escuela.edu</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    height: 300,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  valoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  valorCard: {
    width: width * 0.4,
    alignItems: 'center',
    padding: 15,
  },
  valorTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  equipoCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    elevation: 3,
  },
  equipoFoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  equipoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  equipoCargo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  equipoAños: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  logrosSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  logroCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logroAño: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 15,
    color: '#2c3e50',
  },
  logroDesc: {
    fontSize: 14,
    flex: 1,
  },
  proyectoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proyectoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  proyectoDesc: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginHorizontal: 10,
  },
  redesSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  redesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  redSocialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#2c3e50',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  historiaCard: {
    marginBottom: 20,
    elevation: 3,
    backgroundColor: '#fff',
  },
  historiaContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  historiaTitulo: {
    textAlign: 'center',
    marginBottom: 10,
  },
  historiaTexto: {
    textAlign: 'center',
    lineHeight: 24,
  },
  cursosSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  cursoCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cursoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cursoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  modalidadBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  modalidadText: {
    color: '#1976d2',
    fontSize: 12,
    fontWeight: '500',
  },
  cursoDuracion: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  cursoHorario: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 10,
  },
  cursoDescripcion: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
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