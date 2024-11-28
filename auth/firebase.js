import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1f-027EYJPnQDOpvceFudD3Ysl_Wok2c",
  authDomain: "pochoclosapp.firebaseapp.com",
  projectId: "pochoclosapp",
  storageBucket: "pochoclosapp.appspot.com",
  messagingSenderId: "709855908187",
  appId: "1:709855908187:web:11dbde2c546b1d56d00a7e",
  measurementId: "G-YX4GKTX6FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Descomenta esta línea si necesitas autenticación
export const db = getFirestore(app);
export default app;