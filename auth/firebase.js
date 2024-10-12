// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
/*
const [loggedIn, setloggedIn] = useState(false);
const [userInfo, setuserInfo] = useState([]);*/