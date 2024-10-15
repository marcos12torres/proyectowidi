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
  signInWithRedirect, 
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  // Maneja el cambio de autenticación en Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe;
  }, []);

  // Maneja el registro o inicio de sesión con email y contraseña
  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        // Iniciar sesión con email y contraseña
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
      } else {
        // Registrar nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        Alert.alert('Éxito', 'Registro exitoso');
      }
    } catch (error: any) {
      // Manejar los errores más comunes
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Error', 'Este correo ya está en uso.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Error', 'El correo electrónico no es válido.');
          break;
        case 'auth/weak-password':
          Alert.alert('Error', 'La contraseña es demasiado débil.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Error', 'Contraseña incorrecta.');
          break;
        case 'auth/user-not-found':
          Alert.alert('Error', 'No se encontró el usuario.');
          break;
        default:
          Alert.alert('Error', error.message);
          break;
      }
    }
  };

  // Maneja el inicio de sesión con Google utilizando redirección
  const handleGoogleLogin = async () => {
    try {
      // Usa redirección en lugar de popup
      await signInWithRedirect(auth, provider);
      const result = await getRedirectResult(auth); // Obtén el resultado después de la redirección
      if (result && result.user) {
        setUser(result.user);
        Alert.alert('Éxito', 'Inicio de sesión con Google exitoso');
      }
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo iniciar sesión con Google: ' + error.message);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Alert.alert('Éxito', 'Has cerrado sesión');
    } catch (error: any) {
      Alert.alert('Error', 'Error al cerrar sesión: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.loggedInContainer}>
          <Text style={styles.title}>Bienvenido, {user.email || user.displayName}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.circle}>
          <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>

          {/* Formulario para login con email y contraseña */}
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
            <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
          </TouchableOpacity>
        </View>
      )}
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
  loggedInContainer: {
    alignItems: 'center',
  },
});

export default Login;