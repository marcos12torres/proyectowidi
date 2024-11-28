import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert, // Añadimos Alert para debug
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// Definir el tipo para la navegación
type RootDrawerParamList = {
  Login: undefined;
  Roles: undefined;
  // ... otras rutas
};

type NavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelection = () => {
    try {
      console.log('Intentando navegar a Roles...'); // Debug log
      navigation.navigate('Roles');
      
      // Opcional: Agregar un Alert para verificar si la función se ejecuta
      Alert.alert('Navegando', 'Intentando ir a la pantalla de Roles');
    } catch (error) {
      console.error('Error al navegar:', error);
      Alert.alert('Error', 'No se pudo navegar a la pantalla de Roles');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => setEmail('')}>
          <Text style={styles.buttonText}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setEmail('facebook@example.com')}>
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setPassword('')}>
          <Text style={styles.buttonText}>Password</Text>
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
  // Estilos específicos para el botón de roles
  roleButton: {
    backgroundColor: '#4CAF50', // Color verde para distinguirlo
    marginTop: 20, // Espacio adicional arriba
  },
  roleButtonText: {
    color: '#fff', // Texto blanco para mejor contraste
  },
});

export default Login;