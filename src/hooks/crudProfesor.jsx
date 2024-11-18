//Add

//Listar

//Listar por profesor

//Listar profesor por alumno

//Update

import firestore from '@react-native-firebase/firestore';

firestore().collection('alumnos').add({

name: input.name,

}).then(() => {

console.log('Alumno');

});

//listar alumnos 

firestore().collection('alumos').get()

.then(querySnapshot => {

querySnapshot.forEach(documentSnapshot => {

console.log('Alumno ID_DEL_ALUMNO: ', documentSnapshot.id, documentSnapshot.data());
});
});

//hay que ver si funciona, no es del power del profe
const App = () => {
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [resultado, setResultado] = useState([]);

  // Cargar profesores al iniciar
  useEffect(() => {
    firestore()
      .collection('profesores')
      .get()
      .then(querySnapshot => {
        const listaProfesores = [];
        querySnapshot.forEach(doc => {
          listaProfesores.push({ id: doc.id, ...doc.data() });
        });
        setProfesores(listaProfesores);
      })
      .catch(error => console.error('Error al cargar profesores:', error));
  }, []);

  // Listar alumnos por profesor
  const listarPorProfesor = (idProfesor) => {
    firestore()
      .collection('alumnos')
      .where('profesorId', '==', idProfesor)
      .get()
      .then(querySnapshot => {
        const listaAlumnos = [];
        querySnapshot.forEach(doc => {
          listaAlumnos.push({ id: doc.id, ...doc.data() });
        });
        setResultado(listaAlumnos);
      })
      .catch(error => console.error('Error al listar alumnos por profesor:', error));
  };

  // Listar profesor por alumno
  const listarProfesorPorAlumno = (idAlumno) => {
    firestore()
      .collection('alumnos')
      .doc(idAlumno)
      .get()
      .then(alumnoDoc => {
        if (alumnoDoc.exists) {
          const profesorId = alumnoDoc.data().profesorId;
          firestore()
            .collection('profesores')
            .doc(profesorId)
            .get()
            .then(profesorDoc => {
              if (profesorDoc.exists) {
                setResultado([{ id: profesorDoc.id, ...profesorDoc.data() }]);
              } else {
                setResultado([]);
                console.log('No se encontró el profesor asociado.');
              }
            });
        } else {
          console.log('El alumno no existe.');
          setResultado([]);
        }
      })
      .catch(error => console.error('Error al listar profesor por alumno:', error));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Profesores</Text>
      <FlatList
        data={profesores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => listarPorProfesor(item.id)}
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#f0f0f0',
              borderRadius: 5,
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Resultados</Text>
      <FlatList
        data={resultado}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Text>ID: {item.id}</Text>
            <Text>{JSON.stringify(item)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;


//actualizar
firestore().collection('alumnos').doc(userId).update({

   // age: 26,  data que no se que poner para actualizar
    
    }).then(() => {
    
    console.log('User updated!');
    
    });