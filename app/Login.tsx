import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic with Firebase here
    console.log('Logging in with:', email, password);
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Member Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#70C5CE', // Lighter turquoise
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 450,
    height: 450,
    borderRadius: 300,
    backgroundColor: '#11787D', // Darker turquoise
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
    color: '#11787D', // Darker turquoise
  },
});

export default Login;