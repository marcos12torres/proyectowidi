import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { auth, provider } from './auth/firebase'; // Asegúrate de que el path sea correcto

import { signInWithPopup, getRedirectResult, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';


const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // Maneja el inicio de sesión con Google usando Popup
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);  // Para web
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const user = result.user;
        setLoggedIn(true);
        setUserInfo(user);
        console.log("Login con Google exitoso:", user);
      } else {
        console.error("No se pudo obtener la credencial");
      }
    } catch (error) {
      console.error("Error al login con Google:", error);
    }
  };

  // Maneja el inicio de sesión con Google usando Redirect (usualmente para móvil)
  const handleGoogleLoginRedirect = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error al login con Google redirect:", error);
    }
  };

  // Obtiene el resultado de Redirect
  const handleGetRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const user = result.user;
          setLoggedIn(true);
          setUserInfo(user);
          console.log("Login con Google exitoso:", user);
        } else {
          console.error("No se pudo obtener la credencial");
        }
      }
    } catch (error) {
      console.error("Error al obtener resultado de redirect:", error);
    }
  };

  useEffect(() => {
    handleGetRedirectResult();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Facebook')}>
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Password')}>
          <Text style={styles.buttonText}>Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Member Login')}>
          <Text style={styles.buttonText}>Member Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#70C5CE', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 450,
    height: 450,
    borderRadius: 300,
    backgroundColor: '#11787D', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11787D', 
  },
});

export default Login;
