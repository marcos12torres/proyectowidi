import React, { useState, useEffect, createContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { auth, provider } from './auth/firebase'; 
import {
  signInWithPopup,
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const nav = useNavigation();

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
        //@ts-ignore
        nav.navigate('Inicio'); /* después de un inicio de sesión o registro exitoso, 
        el usuario será redirigido a la pantalla de "Inicio".*/
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
        setLoggedIn(true);
        //@ts-ignore
        nav.navigate('Inicio'); // Navegar a la pantalla de Inicio después de iniciar sesión
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Éxito', 'Usuario registrado correctamente!');
        setLoggedIn(true);
        //@ts-ignore
        nav.navigate('Inicio'); // Navegar a la pantalla de Inicio después del registro
      }
    } catch (error) {
      //@ts-ignore
      Alert.alert('Error', error.message); //Alert para manejar errores en caso de problemas con el inicio de sesión o registro.
    }
  };

  // Alternar entre inicio de sesión y registro
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>

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

        <TouchableOpacity style={styles.toggleText} onPress={toggleAuthMode}>
          <Text style={styles.toggleText}>{isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}</Text>
        </TouchableOpacity>

        {/* Botón de Google */}
        <TouchableOpacity style={styles.buttonGoogle} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  circle: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#2980B9',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  toggleText: {
    marginTop: 20,
    color: '#2980B9',
    fontSize: 16,
  },
  buttonGoogle: {
    width: '100%',
    padding: 15,
    backgroundColor: '#DB4437',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Login;
