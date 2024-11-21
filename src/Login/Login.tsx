import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { auth } from '@/app/auth/firebase'; // Removido provider ya que no usaremos Google Sign-In por ahora
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Login = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Estado de autenticación cambió:', currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleAuthentication = async () => {
    try {
      console.log('Iniciando autenticación...', { isLogin, email, password });
      
      if (isLogin) {
        console.log('Intentando iniciar sesión...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login exitoso:', userCredential.user);
        setUser(userCredential.user);
        
        // Agregamos un callback al Alert para asegurarnos que la navegación ocurra
        Alert.alert('Éxito', 'Inicio de sesión exitoso', [
          {
            text: 'OK',
            onPress: () => {
              console.log('Navegando a UserTypeSelection...');
              navigation.navigate('UserTypeSelection');
            }
          }
        ]);
      } else {
        console.log('Intentando registrar usuario...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registro exitoso:', userCredential.user);
        setUser(userCredential.user);
        
        Alert.alert('Éxito', 'Registro exitoso', [
          {
            text: 'OK',
            onPress: () => {
              console.log('Navegando a UserTypeSelection después del registro...');
              navigation.navigate('UserTypeSelection');
            }
          }
        ]);
      }
    } catch (error: any) {
      console.error('Error en autenticación:', error);
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
            <Text style={{color: '#fff'}}>{isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}</Text>
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