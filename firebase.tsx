// Importa las funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore
import { getAnalytics } from "firebase/analytics";

// Tu configuración web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1f-02Z7YPJpQDOpvceFudD3Ysl_Wok2c",
  authDomain: "pochoclosapp.firebaseapp.com",
  projectId: "pochoclosapp",
  storageBucket: "pochoclosapp.appspot.com",
  messagingSenderId: "709855908187",
  appId: "1:709855908187:web:11dbde2c546b1d56d00a7e",
  measurementId: "G-YX4GKTX6FV"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Firestore
const db = getFirestore(app); // Agrega esta línea

// Exporta la instancia de Firestore para usarla en otros archivos
export { db };
