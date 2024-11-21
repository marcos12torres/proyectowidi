import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ScrollView, 
  Alert,
  Dimensions,
  Platform,
  useWindowDimensions,
  Modal
} from 'react-native';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  onSnapshot, 
  query, 
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '@/auth/firebase';

// Obtener dimensiones de la pantalla
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Configuración responsive
const isSmallDevice = windowWidth < 768;
const fontSize = isSmallDevice ? {
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18
} : {
  small: 14,
  medium: 16,
  large: 20,
  xlarge: 24
};

const padding = isSmallDevice ? {
  small: 5,
  medium: 8,
  large: 10,
  xlarge: 15
} : {
  small: 8,
  medium: 10,
  large: 15,
  xlarge: 20
};

interface Alumno {
  id: string;
  nombre: string;
  comentario: string;
  aprobado: boolean;
  trabajos: {
    [key: string]: {
      completado: boolean;
      fecha: string;
      comentario?: string;
    };
  };
  comunicaciones: boolean;
  createdAt: any;
  updatedAt: any;
}
const AlumnosScreen: React.FC = () => {
  const dimensions = useWindowDimensions();
  const isSmallScreen = dimensions.width < 768;
  const cursosPredefenidos = ['6º1', '6º2', '6º3', '6º4'];
  
  // Estados principales
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [cursos, setCursos] = useState<string[]>([]);
  const [selectedCurso, setSelectedCurso] = useState('6º1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMateriasMenu, setShowMateriasMenu] = useState<boolean>(false);
  const [showCursosMenu, setShowCursosMenu] = useState<boolean>(false);
  const [cursoToAdd, setCursoToAdd] = useState('');
  const [alumnoToAdd, setAlumnoToAdd] = useState('');
  const [orientation, setOrientation] = useState('portrait');

  // Nuevos estados para trabajos prácticos
  const [trabajos, setTrabajos] = useState<string[]>(['TP1', 'TP2', 'TP3']);
  const [nuevoTp, setNuevoTp] = useState('');
  const [showTpModal, setShowTpModal] = useState(false);
  const [selectedTp, setSelectedTp] = useState<string | null>(null);
  const [selectedAlumnoIndex, setSelectedAlumnoIndex] = useState<number | null>(null);
  const [tpComentario, setTpComentario] = useState('');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      setOrientation(width < height ? 'portrait' : 'landscape');
    });

    const initializeCursos = async () => {
      const cursosRef = collection(db, 'cursos');
      
      for (const curso of cursosPredefenidos) {
        const q = query(cursosRef, where('nombre', '==', curso));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          await addDoc(cursosRef, {
            nombre: curso,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      }

      const unsubscribe = onSnapshot(cursosRef, (snapshot) => {
        const cursosData = snapshot.docs.map(doc => doc.data().nombre);
        setCursos(cursosData.sort());
      });

      return () => {
        unsubscribe();
      };
    };

    initializeCursos();

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, `cursos/${selectedCurso}/alumnos`),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const alumnosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Alumno[];
      setAlumnos(alumnosData);
    }, (error) => {
      console.error("Error al escuchar cambios:", error);
      Alert.alert("Error", "No se pudieron cargar los alumnos");
    });

    return () => unsubscribe();
  }, [selectedCurso]);
    // Manejadores básicos
    const handleSearch = (text: string) => {
      setSearchQuery(text);
    };
  
    const handleCommentChange = async (index: number, text: string) => {
      try {
        const alumno = alumnos[index];
        const alumnoRef = doc(db, `cursos/${selectedCurso}/alumnos/${alumno.id}`);
        await updateDoc(alumnoRef, {
          comentario: text,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error al actualizar comentario:', error);
        Alert.alert('Error', 'No se pudo guardar el comentario');
      }
    };
  
    const handleAprobadoChange = async (index: number) => {
      try {
        const alumno = alumnos[index];
        const alumnoRef = doc(db, `cursos/${selectedCurso}/alumnos/${alumno.id}`);
        await updateDoc(alumnoRef, {
          aprobado: !alumno.aprobado,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error al actualizar estado aprobado:', error);
        Alert.alert('Error', 'No se pudo actualizar el estado');
      }
    };
  
    // Nuevos manejadores para TPs
    const handleTpChange = async (alumnoIndex: number, tpNombre: string) => {
      try {
        const alumno = alumnos[alumnoIndex];
        if (!alumno) return;

        const alumnoRef = doc(db, `cursos/${selectedCurso}/alumnos/${alumno.id}`);
        
        const trabajoActual = alumno.trabajos?.[tpNombre] || {
          completado: false,
          fecha: new Date().toISOString(),
          comentario: ''
        };
  
        const nuevoTrabajo = {
          ...trabajoActual,
          completado: !trabajoActual.completado,
          fecha: new Date().toISOString()
        };
  
        await updateDoc(alumnoRef, {
          [`trabajos.${tpNombre}`]: nuevoTrabajo,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error al actualizar TP:', error);
        Alert.alert('Error', 'No se pudo actualizar el estado del TP');
      }
    };
  
    const handleTpComentario = async (alumnoIndex: number, tpNombre: string, comentario: string) => {
      try {
        const alumno = alumnos[alumnoIndex];
        const alumnoRef = doc(db, `cursos/${selectedCurso}/alumnos/${alumno.id}`);
        
        const trabajoActual = alumno.trabajos[tpNombre] || {
          completado: false,
          fecha: new Date().toISOString(),
          comentario: ''
        };
  
        await updateDoc(alumnoRef, {
          [`trabajos.${tpNombre}`]: {
            ...trabajoActual,
            comentario: comentario
          },
          updatedAt: serverTimestamp()
        });
  
        setShowTpModal(false);
        setTpComentario('');
        setSelectedTp(null);
        setSelectedAlumnoIndex(null);
      } catch (error) {
        console.error('Error al actualizar comentario del TP:', error);
        Alert.alert('Error', 'No se pudo guardar el comentario');
      }
    };
  
    const handleAgregarTp = async () => {
      if (!nuevoTp.trim()) {
        Alert.alert('Error', 'Por favor ingrese un nombre para el TP');
        return;
      }
  
      if (trabajos.includes(nuevoTp)) {
        Alert.alert('Error', 'Este TP ya existe');
        return;
      }
  
      setTrabajos([...trabajos, nuevoTp]);
      
      // Actualizar todos los alumnos existentes con el nuevo TP
      for (const alumno of alumnos) {
        const alumnoRef = doc(db, `cursos/${selectedCurso}/alumnos/${alumno.id}`);
        await updateDoc(alumnoRef, {
          [`trabajos.${nuevoTp}`]: {
            completado: false,
            fecha: new Date().toISOString(),
            comentario: ''
          },
          updatedAt: serverTimestamp()
        });
      }
  
      setNuevoTp('');
    };
  
    const handleComunicacionesChange = async (index: number) => {
      try {
        const alumno = alumnos[index];
        const alumnoRef = doc(db, `cursos/${selectedCurso}/alumnos/${alumno.id}`);
        await updateDoc(alumnoRef, {
          comunicaciones: !alumno.comunicaciones,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error al actualizar estado comunicaciones:', error);
        Alert.alert('Error', 'No se pudo actualizar el estado');
      }
    };
  
    const handleDelete = async (index: number) => {
      try {
        const alumno = alumnos[index];
        Alert.alert(
          "Confirmar eliminación",
          `¿Está seguro de eliminar a ${alumno.nombre}?`,
          [
            {
              text: "Cancelar",
              style: "cancel"
            },
            {
              text: "Eliminar",
              onPress: async () => {
                const alumnoRef = doc(db, `cursos/${selectedCurso}/alumnos/${alumno.id}`);
                await deleteDoc(alumnoRef);
              },
              style: "destructive"
            }
          ]
        );
      } catch (error) {
        console.error('Error al eliminar alumno:', error);
        Alert.alert('Error', 'No se pudo eliminar el alumno');
      }
    };
    const filteredAlumnos = alumnos.filter(alumno =>
      alumno.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const toggleMateriasMenu = () => {
      setShowMateriasMenu(!showMateriasMenu);
      if (showCursosMenu) setShowCursosMenu(false);
    };
  
    const toggleCursosMenu = () => {
      setShowCursosMenu(!showCursosMenu);
      if (showMateriasMenu) setShowMateriasMenu(false);
    };
  
    const handleCursoChange = (curso: string) => {
      setSelectedCurso(curso);
      setSearchQuery('');
      setShowCursosMenu(false);
    };
  
    const handleAddCurso = async () => {
      try {
        if (!cursoToAdd.trim()) {
          Alert.alert('Error', 'Por favor ingrese un nombre de curso');
          return;
        }
  
        const cursosRef = collection(db, 'cursos');
        const q = query(cursosRef, where('nombre', '==', cursoToAdd));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          Alert.alert('Error', 'Este curso ya existe');
          return;
        }
  
        const timestamp = serverTimestamp();
        const cursoData = {
          nombre: cursoToAdd,
          createdAt: timestamp,
          updatedAt: timestamp
        };
        
        await addDoc(cursosRef, cursoData);
        setCursoToAdd('');
      } catch (error) {
        console.error(`Error al agregar curso: ${error}`);
        Alert.alert('Error', 'No se pudo agregar el curso');
      }
    };
  
    const handleAddAlumno = async () => {
      try {
        if (!alumnoToAdd.trim()) {
          Alert.alert('Error', 'Por favor ingrese un nombre de alumno');
          return;
        }
  
        const trabajosIniciales: {
          [key: string]: {
            completado: boolean;
            fecha: string;
            comentario: string;
          };
        } = {};
  
        trabajos.forEach(tp => {
          trabajosIniciales[tp] = {
            completado: false,
            fecha: new Date().toISOString(),
            comentario: ''
          };
        });
  
        const timestamp = serverTimestamp();
        const alumnoData = {
          nombre: alumnoToAdd,
          comentario: '',
          aprobado: false,
          trabajos: trabajosIniciales,
          comunicaciones: false,
          createdAt: timestamp,
          updatedAt: timestamp
        };
        
        const alumnoRef = collection(db, `cursos/${selectedCurso}/alumnos`);
        await addDoc(alumnoRef, alumnoData);
        setAlumnoToAdd('');
      } catch (error) {
        console.error(`Error al agregar alumno: ${error}`);
        Alert.alert('Error', 'No se pudo agregar el alumno');
      }
    };
  
    // Inicio del renderizado
    return (
      <View style={styles.container}>
        <View style={[
          styles.header,
          isSmallScreen && styles.headerMobile
        ]}>
          <View style={styles.titleContainer}>
            <Text style={[
              styles.title,
              isSmallScreen && styles.titleMobile
            ]}>Seguimiento de Alumnos</Text>
          </View>
          <View style={[
          styles.filterContainer,
          isSmallScreen && styles.filterContainerMobile
        ]}>
          <View style={styles.filterButton}>
            <Text style={[
              styles.filterButtonText,
              isSmallScreen && styles.filterButtonTextMobile
            ]}>Filtros</Text>
            <View style={styles.filterIcons}>
              <TouchableOpacity 
                style={[
                  styles.filterIcon,
                  isSmallScreen && styles.filterIconMobile
                ]} 
                onPress={toggleCursosMenu}
              >
                <Text style={styles.filterIconText}>Cursos</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterIcon,
                  isSmallScreen && styles.filterIconMobile
                ]} 
                onPress={toggleMateriasMenu}
              >
                <Text style={styles.filterIconText}>Materias</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        horizontal={isSmallScreen}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={[styles.content, isSmallScreen && styles.contentMobile]}
      >
        <View style={[styles.contentWrapper, isSmallScreen && styles.contentWrapperMobile]}>
          <Text style={[styles.sectionTitle, isSmallScreen && styles.sectionTitleMobile]}>
            {` ${selectedCurso}/alumnos`}
          </Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.searchInput, isSmallScreen && styles.searchInputMobile]}
              placeholder="Buscar alumnos..."
              onChangeText={handleSearch}
              value={searchQuery}
            />
          </View>

          <View style={[styles.tableContainer, isSmallScreen && styles.tableContainerMobile]}>
            <View style={[styles.tableHeader, isSmallScreen && styles.tableHeaderMobile]}>
              <Text style={[styles.tableHeaderText, isSmallScreen && styles.tableHeaderTextMobile]}>Alumnos</Text>
              <Text style={[styles.tableHeaderText, isSmallScreen && styles.tableHeaderTextMobile]}>Comentario</Text>
              <Text style={[styles.tableHeaderText, isSmallScreen && styles.tableHeaderTextMobile]}>Notas</Text>
              <Text style={[styles.tableHeaderText, isSmallScreen && styles.tableHeaderTextMobile]}>Trabajos Prácticos</Text>
              <Text style={[styles.tableHeaderText, isSmallScreen && styles.tableHeaderTextMobile]}>Comunicaciones</Text>
              <Text style={[styles.tableHeaderText, isSmallScreen && styles.tableHeaderTextMobile]}>Acciones</Text>
            </View>
            <View style={styles.tableBody}>
              <FlatList
                data={filteredAlumnos}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View style={[styles.tableRow, isSmallScreen && styles.tableRowMobile]}>
                    <Text style={[styles.tableRowText, isSmallScreen && styles.tableRowTextMobile]}>
                      {item.nombre}
                    </Text>
                    <TextInput
                      style={[styles.tableRowInput, isSmallScreen && styles.tableRowInputMobile]}
                      placeholder="Comentario"
                      onChangeText={(text) => handleCommentChange(index, text)}
                      value={item.comentario}
                      multiline={true}
                      numberOfLines={2}
                    />
                    <TouchableOpacity 
                      style={[
                        styles.tableRowButton, 
                        item.aprobado && styles.tableRowButtonActive,
                        isSmallScreen && styles.tableRowButtonMobile
                      ]} 
                      onPress={() => handleAprobadoChange(index)}
                    >
                      <Text style={[styles.tableRowButtonText, isSmallScreen && styles.tableRowButtonTextMobile]}>
                        {item.aprobado ? 'Aprobado' : 'No Aprobado'}
                      </Text>
                    </TouchableOpacity>
                    
                    {/* Sección de Trabajos Prácticos */}
                    <View style={[styles.trabajosContainer, isSmallScreen && styles.trabajosContainerMobile]}>
                      {trabajos.map((tp) => (
                        <View key={tp} style={styles.tpRow}>
                          <TouchableOpacity 
                            style={[
                              styles.tpButton,
                              (item.trabajos && item.trabajos[tp]?.completado) && styles.tpButtonActive,
                              isSmallScreen && styles.tpButtonMobile
                            ]}
                            onPress={() => handleTpChange(index, tp)}
                          >
                            <Text style={styles.tpButtonText}>
                              {`${tp}: ${item.trabajos && item.trabajos[tp]?.completado ? '✓' : '✗'}`}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={styles.tpCommentButton}
                            onPress={() => {
                              setSelectedTp(tp);
                              setSelectedAlumnoIndex(index);
                              setTpComentario(item.trabajos[tp]?.comentario || '');
                              setShowTpModal(true);
                            }}
                          >
                            <Text style={styles.tpCommentButtonText}>📝</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity 
                      style={[
                        styles.tableRowButton, 
                        item.comunicaciones && styles.tableRowButtonActive,
                        isSmallScreen && styles.tableRowButtonMobile
                      ]} 
                      onPress={() => handleComunicacionesChange(index)}
                    >
                      <Text style={[styles.tableRowButtonText, isSmallScreen && styles.tableRowButtonTextMobile]}>
                        {item.comunicaciones ? 'Si' : 'No'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.deleteButton, isSmallScreen && styles.deleteButtonMobile]} 
                      onPress={() => handleDelete(index)}
                    >
                      <Text style={[styles.deleteButtonText, isSmallScreen && styles.deleteButtonTextMobile]}>
                        Eliminar
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal para comentarios de TP */}
      <Modal
        visible={showTpModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {`Comentario para ${selectedTp}`}
            </Text>
            <TextInput
              style={styles.modalInput}
              multiline={true}
              numberOfLines={4}
              value={tpComentario}
              onChangeText={setTpComentario}
              placeholder="Escriba un comentario..."
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setShowTpModal(false);
                  setTpComentario('');
                  setSelectedTp(null);
                  setSelectedAlumnoIndex(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={() => {
                  if (selectedAlumnoIndex !== null && selectedTp) {
                    handleTpComentario(selectedAlumnoIndex, selectedTp, tpComentario);
                  }
                }}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {showMateriasMenu && (
        <View style={[styles.materiasMenu, isSmallScreen && styles.materiasMenuMobile]}>
          <ScrollView>
            <Text style={[styles.materiaItem, isSmallScreen && styles.materiaItemMobile]}>
              Matemática
            </Text>
            <Text style={[styles.materiaItem, isSmallScreen && styles.materiaItemMobile]}>
              Historia
            </Text>
            <Text style={[styles.materiaItem, isSmallScreen && styles.materiaItemMobile]}>
              Lengua
            </Text>
          </ScrollView>
        </View>
      )}

      {showCursosMenu && (
        <View style={[styles.cursosMenu, isSmallScreen && styles.cursosMenuMobile]}>
          <ScrollView style={{ maxHeight: isSmallScreen ? windowHeight * 0.4 : windowHeight * 0.6 }}>
            {cursos.map((curso) => (
              <TouchableOpacity 
                key={curso} 
                style={[
                  styles.cursoItem,
                  selectedCurso === curso && styles.cursoItemSelected,
                  isSmallScreen && styles.cursoItemMobile
                ]} 
                onPress={() => handleCursoChange(curso)}
              >
                <Text style={[
                  styles.cursoItemText,
                  selectedCurso === curso && styles.cursoItemTextSelected,
                  isSmallScreen && styles.cursoItemTextMobile
                ]}>
                  {curso}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={[styles.buttonContainer, isSmallScreen && styles.buttonContainerMobile]}>
        <View style={[styles.inputGroup, isSmallScreen && styles.inputGroupMobile]}>
          <TouchableOpacity 
            style={[styles.button, isSmallScreen && styles.buttonMobile]} 
            onPress={handleAddCurso}
          >
            <Text style={[styles.buttonText, isSmallScreen && styles.buttonTextMobile]}>
              Agregar Curso
            </Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, isSmallScreen && styles.inputMobile]}
            placeholder="Nombre del curso"
            value={cursoToAdd}
            onChangeText={(text) => setCursoToAdd(text)}
          />
        </View>

        <View style={[styles.inputGroup, isSmallScreen && styles.inputGroupMobile]}>
          <TouchableOpacity 
            style={[styles.button, isSmallScreen && styles.buttonMobile]} 
            onPress={handleAddAlumno}
          >
            <Text style={[styles.buttonText, isSmallScreen && styles.buttonTextMobile]}>
              Guardar Alumno
            </Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, isSmallScreen && styles.inputMobile]}
            placeholder="Nombre del alumno"
            value={alumnoToAdd}
            onChangeText={(text) => setAlumnoToAdd(text)}
          />
        </View>

        <View style={[styles.inputGroup, isSmallScreen && styles.inputGroupMobile]}>
          <TouchableOpacity 
            style={[styles.button, isSmallScreen && styles.buttonMobile]} 
            onPress={handleAgregarTp}
          >
            <Text style={[styles.buttonText, isSmallScreen && styles.buttonTextMobile]}>
              Agregar TP
            </Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, isSmallScreen && styles.inputMobile]}
            placeholder="Nombre del nuevo TP"
            value={nuevoTp}
            onChangeText={(text) => setNuevoTp(text)}
          />
        </View>
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
    padding: padding.large,
    borderRadius: 20,
    margin: padding.medium,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerMobile: {
    padding: padding.medium,
    margin: padding.small,
    flexDirection: 'column',
  },
  titleContainer: {
    flex: isSmallDevice ? 0 : 1,
    marginBottom: isSmallDevice ? padding.medium : 0,
  },
  title: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold',
    color: 'black',
  },
  titleMobile: {
    fontSize: fontSize.large,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainerMobile: {
    width: '100%',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: padding.medium,
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#000',
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    marginRight: padding.medium,
  },
  filterButtonTextMobile: {
    fontSize: fontSize.small,
  },
  filterIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    backgroundColor: '#fff',
    padding: padding.medium,
    borderRadius: 5,
    marginLeft: padding.small,
    elevation: 2,
  },
  filterIconMobile: {
    padding: padding.small,
  },
  filterIconText: {
    color: '#000',
    fontSize: isSmallDevice ? fontSize.small : fontSize.medium,
  },
  content: {
    padding: padding.large,
  },
  contentMobile: {
    padding: padding.small,
  },
  contentWrapper: {
    flex: 1,
    minWidth: isSmallDevice ? windowWidth * 1.5 : '100%',
  },
  contentWrapperMobile: {
    minWidth: windowWidth * 2,
  },
  // Nuevos estilos para trabajos prácticos
  trabajosContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: padding.medium,
    padding: padding.small,
  },
  trabajosContainerMobile: {
    marginLeft: padding.small,
    padding: padding.small / 2,
  },
  tpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: padding.small,
  },
  tpButton: {
    flex: 1,
    backgroundColor: '#E0FFFF',
    padding: padding.small,
    borderRadius: 5,
    marginRight: padding.small,
    borderWidth: 1,
    borderColor: '#B2DFEE',
  },
  tpButtonMobile: {
    padding: padding.small / 2,
  },
  tpButtonActive: {
    backgroundColor: '#7FFFD4',
    borderColor: '#4CAF50',
  },
  tpButtonText: {
    fontSize: fontSize.small,
    textAlign: 'center',
  },
  tpCommentButton: {
    padding: padding.small,
    borderRadius: 5,
  },
  tpCommentButtonText: {
    fontSize: fontSize.medium,
  },
    // Continuación de los estilos
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: padding.large,
      borderRadius: 10,
      width: '80%',
      maxWidth: 500,
    },
    modalTitle: {
      fontSize: fontSize.large,
      fontWeight: 'bold',
      marginBottom: padding.medium,
      textAlign: 'center',
    },
    modalInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: padding.medium,
      marginBottom: padding.medium,
      textAlignVertical: 'top',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    modalButton: {
      padding: padding.medium,
      borderRadius: 5,
      minWidth: 100,
    },
    modalButtonCancel: {
      backgroundColor: '#ff6b6b',
    },
    modalButtonSave: {
      backgroundColor: '#4CAF50',
    },
    modalButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: fontSize.medium,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: padding.medium,
    },
    searchInput: {
      flex: 1,
      backgroundColor: '#fff',
      padding: padding.medium,
      borderRadius: 5,
      marginRight: padding.medium,
      borderWidth: 1,
      borderColor: '#ddd',
      fontSize: fontSize.medium,
    },
    searchInputMobile: {
      padding: padding.small,
      fontSize: fontSize.small,
    },
    tableContainer: {
      backgroundColor: '#fff',
      borderRadius: 5,
      marginBottom: padding.large,
      padding: padding.medium,
      minWidth: '100%',
      elevation: 2,
    },
    tableContainerMobile: {
      padding: padding.small,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#B2DFEE',
      padding: padding.medium,
      marginBottom: padding.medium,
      borderRadius: 5,
    },
    tableHeaderMobile: {
      padding: padding.small,
    },
    tableHeaderText: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: fontSize.medium,
    },
    tableHeaderTextMobile: {
      fontSize: fontSize.small,
    },
    tableBody: {
      marginBottom: padding.medium,
    },
    tableRow: {
      flexDirection: 'row',
      padding: padding.medium,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      alignItems: 'center',
    },
    tableRowMobile: {
      padding: padding.small,
    },
    tableRowText: {
      flex: 1,
      fontSize: fontSize.medium,
    },
    tableRowTextMobile: {
      fontSize: fontSize.small,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: padding.large,
      padding: padding.medium,
    },
    buttonContainerMobile: {
      flexDirection: 'column',
      padding: padding.small,
    },
    inputGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: padding.medium,
    },
    inputGroupMobile: {
      marginRight: 0,
      marginBottom: padding.medium,
      width: '100%',
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: padding.medium,
      borderRadius: 5,
      marginRight: padding.medium,
      elevation: 2,
    },
    buttonMobile: {
      padding: padding.small,
      marginRight: padding.small,
    },
    buttonText: {
      color: '#fff',
      fontSize: fontSize.medium,
    },
    buttonTextMobile: {
      fontSize: fontSize.small,
    },
    input: {
      flex: 1,
      backgroundColor: '#fff',
      padding: padding.medium,
      borderRadius: 5,
      marginRight: padding.medium,
      borderWidth: 1,
      borderColor: '#ddd',
      fontSize: fontSize.medium,
    },
    inputMobile: {
      padding: padding.small,
      fontSize: fontSize.small,
    },
    deleteButton: {
      backgroundColor: '#f44336',
      padding: padding.medium,
      borderRadius: 5,
      marginLeft: padding.medium,
    },
    deleteButtonMobile: {
      padding: padding.small,
      marginLeft: padding.small,
    },
    deleteButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: fontSize.medium,
    },
    deleteButtonTextMobile: {
      fontSize: fontSize.small,
    },
    sectionTitle: {
      fontSize: fontSize.large,
      fontWeight: 'bold',
      marginBottom: padding.medium,
    },
    sectionTitleMobile: {
      fontSize: fontSize.medium,
    },
    tableRowInput: {
      flex: 1,
      backgroundColor: '#fff',
      padding: padding.medium,
      borderRadius: 5,
      marginHorizontal: padding.small,
      borderWidth: 1,
      borderColor: '#ddd',
      fontSize: fontSize.medium,
    },
    tableRowInputMobile: {
      padding: padding.small,
      fontSize: fontSize.small,
    },
    tableRowButton: {
      flex: 1,
      backgroundColor: '#E0FFFF',
      padding: padding.medium,
      borderRadius: 5,
      marginHorizontal: padding.small,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tableRowButtonActive: {
      backgroundColor: '#7FFFD4',
    },
    tableRowButtonMobile: {
      padding: padding.small,
    },
    tableRowButtonText: {
      fontSize: fontSize.medium,
      textAlign: 'center',
    },
    tableRowButtonTextMobile: {
      fontSize: fontSize.small,
    },
    materiasMenu: {
      position: 'absolute',
      top: 100,
      right: 20,
      backgroundColor: '#fff',
      padding: padding.medium,
      borderRadius: 5,
      elevation: 4,
      minWidth: 200,
    },
    materiasMenuMobile: {
      top: 150,
      right: 10,
      minWidth: 150,
    },
    materiaItem: {
      padding: padding.medium,
      fontSize: fontSize.medium,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    materiaItemMobile: {
      padding: padding.small,
      fontSize: fontSize.small,
    },
    cursosMenu: {
      position: 'absolute',
      top: 100,
      right: 20,
      backgroundColor: '#fff',
      padding: padding.medium,
      borderRadius: 5,
      elevation: 4,
      minWidth: 200,
    },
    cursosMenuMobile: {
      top: 150,
      right: 10,
      minWidth: 150,
    },
    cursoItem: {
      padding: padding.medium,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    cursoItemMobile: {
      padding: padding.small,
    },
    cursoItemSelected: {
      backgroundColor: '#E0FFFF',
    },
    cursoItemText: {
      fontSize: fontSize.medium,
    },
    cursoItemTextMobile: {
      fontSize: fontSize.small,
    },
    cursoItemTextSelected: {
      fontWeight: 'bold',
    },
  });
  
  export default AlumnosScreen;