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