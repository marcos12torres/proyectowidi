/*import firestore from '@react-native-firebase/firestore';

const fetchRENAPERData = async () => {
  try {
    const response = await fetch('https://api-renaper.example.com/endpoint', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer TU_TOKEN_DE_AUTENTICACIÓN',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la API RENAPER: ${response.status}`);
    }

    const data = await response.json();
    console.log('Datos obtenidos de RENAPER:', data);

    // Guardar profesores y alumnos en Firebase
    data.profesores.forEach(async (profesor) => {
      await firestore().collection('profesores').doc(profesor.id).set(profesor);
    });

    data.alumnos.forEach(async (alumno) => {
      await firestore().collection('alumnos').doc(alumno.id).set(alumno);
    });
  } catch (error) {
    console.error('Error al conectar con RENAPER:', error);
  }
};
