// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);