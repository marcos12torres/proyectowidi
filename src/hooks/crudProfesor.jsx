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

