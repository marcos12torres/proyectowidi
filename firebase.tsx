// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';  // Se agregaron las funciones de Firestore

// Define una interfaz para el tipo de datos de un alumno (esto es opcional, pero recomendable)
interface Alumno {
  nombre: string;
  estado: string;
  comentarios: string;
  // Puedes agregar más propiedades según tus datos de alumno
}

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA79wvtq3yvfOiPUL1RWRbbeXxXNhkYPBk",
  authDomain: "widyy-e87ff.firebaseapp.com",
  projectId: "widyy-e87ff",
  storageBucket: "widyy-e87ff.appspot.com",
  messagingSenderId: "205345824552",
  appId: "1:205345824552:web:4a4e4b26af6a7862973a1d"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);  // Firestore inicializado

export { auth, provider, firestore };

// Función para guardar los datos de los alumnos en Firestore
export const saveAlumnosData = async (curso: string, alumnos: Alumno[]) => {  // Especificamos los tipos de curso y alumnos
  try {
    const cursoDocRef = doc(firestore, 'cursos', curso);  // Referencia al documento del curso
    await setDoc(cursoDocRef, { alumnos });  // Guardar alumnos en el documento del curso
    console.log("Datos guardados correctamente en Firestore.");
  } catch (error) {
    console.error("Error al guardar datos: ", error);
  }
};

// Función para cargar los datos de los alumnos desde Firestore
export const loadAlumnosData = async (curso: string): Promise<Alumno[]> => {  // Especificamos que la función devuelve una promesa de un array de Alumno
  try {
    const cursoDocRef = doc(firestore, 'cursos', curso);  // Referencia al documento del curso
    const docSnap = await getDoc(cursoDocRef);  // Obtener el documento

    if (docSnap.exists()) {
      console.log("Datos de alumnos cargados:", docSnap.data());
      return docSnap.data().alumnos || [];  // Retorna la lista de alumnos o un array vacío si no hay datos
    } else {
      console.log("No se encontró el documento.");
      return [];
    }
  } catch (error) {
    console.error("Error al cargar los datos: ", error);
    return [];
  }
};
