// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  } from 'react-native-google-signin';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =  {
  apiKey: "AIzaSyA79wvtq3yvfOiPUL1RWRbbeXxXNhkYPBk",
  authDomain: "widyy-e87ff.firebaseapp.com",
  projectId: "widyy-e87ff",
  storageBucket: "widyy-e87ff.appspot.com",
  messagingSenderId: "205345824552",
  appId: "1:205345824552:web:4a4e4b26af6a7862973a1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = get(app);
export {auth} 


/*
const [loggedIn, setloggedIn] = useState(false);
const [userInfo, setuserInfo] = useState([]);*/
/*
import firebase from 'firebase/compat/app'; //es la vercion mas vieja 
import { getAuth, signInWithRedirect, signInWithPopup, getRedirectResult } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig =  {
  apiKey: "AIzaSyA79wvtq3yvfOiPUL1RWRbbeXxXNhkYPBk",
  authDomain: "widyy-e87ff.firebaseapp.com",
  projectId: "widyy-e87ff",
  storageBucket: "widyy-e87ff.appspot.com",
  messagingSenderId: "205345824552",
  appId: "1:205345824552:web:4a4e4b26af6a7862973a1d"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, firebase };*/

// Importar funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { 
  signInWithPopup, 
  getRedirectResult, 
  signInWithRedirect, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// Required for side-effects
import "firebase/firestore";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA79wvtq3yvfOiPUL1RWRbbeXxXNhkYPBk",
  authDomain: "widyy-e87ff.firebaseapp.com",
  projectId: "widyy-e87ff",
  storageBucket: "widyy-e87ff.appspot.com",
  messagingSenderId: "205345824552",
  appId: "1:205345824552:web:4a4e4b26af6a7862973a1d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de autenticación
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
