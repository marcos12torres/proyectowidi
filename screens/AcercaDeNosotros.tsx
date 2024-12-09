// Importaciones de React y componentes básicos de React Native
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAdd } from '../app/hooks/useAdd';
import { useDelete } from '../app/hooks/useDelete';
import { useUpdate } from '../app/hooks/useUpdate';
import { useList } from '../app/hooks/useList';

const { width } = Dimensions.get('window');
//12: se obtiene la base de datos de Firestore - getFirestore(app): conecta las credenciales de Firebase con Firestore


//interface / contrato

interface Miembro {
  id?: string; //opcional
  nombre: string; //obligatorio
  cargo: string; //obligatorio
  años: number; //obligatorio
  createdAt?: string; //opcional
}

interface Logro {
  id?: string;
  año: string;
  descripcion: string;
}



const AcercaDeNosotros = () => { //se crea el componente principal de la pantalla
  // Estados principales individuales
  const [equipo, setEquipo] = useState<Miembro[]>([]);
  const [logros, setLogros] = useState<Logro[]>([]);



  // Estados para modales
  const [modalMiembroVisible, setModalMiembroVisible] = useState(false); //ventana oculta
  const [modalLogroVisible, setModalLogroVisible] = useState(false);


  // Estados para edición
  //editandoMiembro: se guarda los datos
  //setEditandoMiembro: actualiza el estado de editandoMiembro
  const [editandoMiembro, setEditandoMiembro] = useState<Miembro | null>(null);
  const [editandoLogro, setEditandoLogro] = useState<Logro | null>(null);

  
  // Estados para modales de edición
  const [modalEditMiembroVisible, setModalEditMiembroVisible] = useState(false);
  const [modalEditLogroVisible, setModalEditLogroVisible] = useState(false);


  // Hooks personalizados
  const { agregarMiembroEquipo, agregarLogro } = useAdd();
  const { eliminarMiembroEquipo, eliminarLogro } = useDelete();
  const { editarMiembroEquipo, editarLogro } = useUpdate();
  const { obtenerEquipo, obtenerLogros } = useList();

  const cargarDatos = async () => { //defino la funcion como asincrona
    try {
      const equipoData = await obtenerEquipo();//obtengo los datos de la bd y los guardo en equipoData
      setEquipo(equipoData as Miembro[]);//actualizo el estado de equipo con los datos obtenidos

      const logrosData = await obtenerLogros();
      setLogros(logrosData as Logro[]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // crear estados para nuevos elementos
  const [nuevoMiembro, setNuevoMiembro] = useState<Miembro>({
    nombre: '',
    cargo: '',
    años: 0
  });

  const [nuevoLogro, setNuevoLogro] = useState<Logro>({
    año: '',
    descripcion: ''
  });





  // Handlers para los botones - UI
  //handleAgregarMiembro: función para agregar un miembro al equipo cuando se presiona el botón de agregar
  //handle: maneja el evento
  const handleAgregarMiembro = async () => {
    try {
      if (nuevoMiembro.nombre && nuevoMiembro.cargo) {
        await agregarMiembroEquipo(nuevoMiembro);
        setModalMiembroVisible(false);
        setNuevoMiembro({ nombre: '', cargo: '', años: 0 });
        await cargarDatos(); // Recargar datos después de agregar
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditarMiembro = async () => {
    try {
      if (editandoMiembro && editandoMiembro.id) {//exige datos actualizados y el ID
        await editarMiembroEquipo(editandoMiembro.id, editandoMiembro);
        setModalEditMiembroVisible(false);
        setEditandoMiembro(null);
        await cargarDatos(); // Recargar datos después de editar
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
        await cargarDatos(); // Recargar datos después de agregar
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditarLogro = async () => {
    try {
      if (editandoLogro && editandoLogro.id) {
        await editarLogro(editandoLogro.id, editandoLogro);
        setModalEditLogroVisible(false);
        setEditandoLogro(null);
        await cargarDatos(); // Recargar datos después de editar
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEliminarMiembro = async (id: string) => {
    try {
      await eliminarMiembroEquipo(id);//elimina el miembro del equipo según el ID
      await cargarDatos(); // Recargar datos después de eliminar
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEliminarLogro = async (id: string) => {
    try {
      await eliminarLogro(id);
      await cargarDatos(); // Recargar datos después de eliminar
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  // Cargar datos al iniciar la pantalla
  useEffect(() => {//se ejecuta automaticamente llamando a la función cargarDatos
    cargarDatos(); //obtiene los datos iniciales de la BD para mostrar algo en pantalla
  }, []);//solo se ejecuta una vez al iniciar la pantalla

  // Monitorear cambios en el estado del equipo
  useEffect(() => {
    console.log('Estado del equipo actualizado:', equipo);//aviso en consola de los cambios
  }, [equipo]);
  return (
    <>
      {/* Modal para Agregar Miembro */}
      <Modal
        animationType="slide"//tipo de animación deslizante
        transparent={true}//fondo semitransparente
        visible={modalMiembroVisible}//control de visibilidad del modal segun el estado
        onRequestClose={() => setModalMiembroVisible(false)}//onRequestClose: función para cerrar el modal
        //por si el usuario quiere salir del modal, se cierra
      >
        {/* contenedor para centrar el modal */}
        <View style={styles.centeredView}>  
          <View style={styles.modalView}>{/* contenedor interno con estilo específico para modal */}
            <Text style={styles.modalTitle}>Agregar Nuevo Miembro</Text>
            
             {/* campos de entrada */}
            <TextInput
              style={styles.input}
              placeholder="Nombre" //texto temporal hasta que el usuario escriba
              value={nuevoMiembro.nombre}//actualiza el valor del campo nombre
              onChangeText={(text) => setNuevoMiembro({...nuevoMiembro, nombre: text})}//actualiza el estado de nuevoMiembro
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

            <View style={styles.modalButtons}>{/* contenedor para los botones */}
              <TouchableOpacity 
                style={[styles.button, styles.buttonCancel]}//aplico estilos para el botón y encima aplico el estilo cancelar
                onPress={() => setModalMiembroVisible(false)}//onPress: función para cerrar el modal sin guardar
              >
                <Text style={styles.textStyle}>Cancelar</Text>  {/* texto del botón */}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}//aplico estilos para el botón y encima aplico el estilo guardar
                onPress={handleAgregarMiembro}//llama a la función handleAgregarMiembro para guardar el miembro
              >
                <Text style={styles.textStyle}>Guardar</Text>  {/* texto del botón */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Editar Miembro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditMiembroVisible}//control de visibilidad del modal segun el estado
        onRequestClose={() => setModalEditMiembroVisible(false)}//onRequestClose: función para cerrar el modal
        //por si el usuario quiere salir del modal, se cierra
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Editar Miembro</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={editandoMiembro?.nombre || ''} //actualiza el valor del campo nombre
              onChangeText={(text) => setEditandoMiembro(prev => prev ? {...prev, nombre: text} : null)} //actualiza el estado de editandoMiembro
            />
            
            <TextInput
              style={styles.input}
              placeholder="Cargo"
              value={editandoMiembro?.cargo || ''}//se fija si hay nombre, sino se queda en blanco
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
                  setModalEditMiembroVisible(false);//cierra el modal
                  setEditandoMiembro(null);//si no se esta editando, se queda en null
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}//aplico estilos para el botón y encima aplico el estilo guardar
                onPress={handleEditarMiembro}//llama a la función handleEditarMiembro para guardar el miembro
              >
                <Text style={styles.textStyle}>Guardar</Text>  {/* texto del botón */}
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
                style={[styles.button, styles.buttonConfirm]}//aplico estilos para el botón y encima aplico el estilo guardar
                onPress={handleAgregarLogro}//llama a la funcion handleAgregarLogro para guardar el logro
              >
                <Text style={styles.textStyle}>Guardar</Text>  {/* texto del botón */}
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
              value={editandoLogro?.año || ''}//actualiza el valor del campo año
              onChangeText={(text) => setEditandoLogro(prev => prev ? {...prev, año: text} : null)}//actualiza el estado de editandoLogro
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




      <ScrollView style={styles.container}> {/* aplica un estilo definido en styles para el contenedor */}
        {/* Banner Principal */}
        <ImageBackground //componente para mostrar una imagen de fondo
          source={require('../app/img/edificio-escolar.png')} //ruta de la imagen
          style={styles.banner} //aplica los estilos definidos al contenedor con la imagen de fondo
        >
          <View style={styles.overlay}> {/* efecto visual - transparencia o color */}
            <Image source={require('../app/img/logo.png')} style={styles.logo} /> {/* imagen dentro del banner */}
            <Text style={styles.mainTitle}>Nuestra Historia Educativa</Text> {/* titulo del banner */}
            <Text style={styles.subTitle}>Formando líderes desde 1200 A.C</Text> {/* subtitulo del banner */}
          </View>
        </ImageBackground>



        {/* Nuestro Equipo */}
        <View style={styles.section}> {/* inicia el contenedor de la seccion */}
          <Text style={styles.sectionTitle}>Nuestro Equipo Directivo</Text> {/* titulo de la seccion */}
          <TouchableOpacity 
            style={styles.adminButton} //boton para agregar un miembro
            onPress={() => setModalMiembroVisible(true)} //abre el modal para agregar un miembro
          >
            <Text style={styles.adminButtonText}>Agregar Miembro</Text> {/* texto del boton */}
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}> {/* scroll horizontal para mostrar los miembros */}
            {equipo.map((miembro, index) => ( //map para recorrer el array de miembros y genera tarjetas para cada miembro
              <View key={index} style={styles.equipoCard}> 
                <Image source={require('../app/img/user.png')} style={styles.equipoFoto} /> {/* imagen del miembro */}
                <Text style={styles.equipoNombre}>{miembro.nombre}</Text> {/* nombre del miembro */}
                <Text style={styles.equipoCargo}>{miembro.cargo}</Text> {/* cargo del miembro */}
                <Text style={styles.equipoAños}>{miembro.años} años en la institución</Text> {/* años en la institución */}
                <View style={styles.cardButtons}>
                  <TouchableOpacity 
                    style={styles.editButton}//boton para editar
                    onPress={() => {
                      setEditandoMiembro(miembro); //actualiza el estado de editandoMiembro
                      setModalEditMiembroVisible(true); //abre el modal para editar
                    }}
                  >
                  <MaterialIcons name="edit" size={24} color="#2ecc71" /> {/* icono de editar */}
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton} //boton para eliminar
                    onPress={() => handleEliminarMiembro(miembro.id!)} //funcion para eliminar
                  >
                    <MaterialIcons name="delete" size={24} color="red" /> {/* icono de eliminar */}
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
                  onPress={() => handleEliminarLogro(logro.id!)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

//estilos personalizados para los diferentes componentes

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

 

  modalidadBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
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