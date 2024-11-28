firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

/*const firebaseConfig = {
  apiKey: "AIzaSyB1f-027EYJPnQDOpvceFudD3Ysl_Wok2c",
  authDomain: "pochoclosapp.firebaseapp.com",
  projectId: "pochoclosapp",
  storageBucket: "pochoclosapp.appspot.com",
  messagingSenderId: "709855908187",
  appId: "1:709855908187:web:11dbde2c546b1d56d00a7e",
  measurementId: "G-YX4GKTX6FV"
};*/
/*const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};*/
const firebaseConfig = {
  // Tus credenciales de Firebase
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const auth = getAuth(appl);//no se si esta bien 
export const db = getFirestore(app);
export default app;