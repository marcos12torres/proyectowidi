import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { auth, provider } from './auth/firebase'; // Asegúrate de que el path sea correcto
import { 
  signInWithPopup, 
  getRedirectResult, 
  signInWithRedirect, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  // Maneja el inicio de sesión con Google usando Popup
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Para web
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

  // Maneja el inicio de sesión con correo y contraseña
  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Éxito', 'Usuario ha iniciado sesión correctamente!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Éxito', 'Usuario registrado correctamente!');
      }
    } catch (error) {
      //Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        {/* Formulario para login con correo y contraseña */}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.buttonText}>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          <Text>{isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}</Text>
        </TouchableOpacity>

        {/* Botón para login con Google */}
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Google</Text>
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
  input: {
    width: 250,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
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
  toggleText: {
    marginVertical: 10,
    color: '#fff',
  },
});

export default Login;