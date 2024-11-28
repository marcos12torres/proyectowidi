import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Roles = () => {
    const navigation = useNavigation<any>();
  
    const handleRoleSelect = (role: string) => {
      switch (role) {
        case 'alumno':
          navigation.navigate('Planilla de seguimiento1');
          break;
        case 'padre':
          navigation.navigate('Planilla de seguimiento2');
          break;
        case 'profesor':
          navigation.navigate('Profesor');
          break;
      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.title}>Selecciona tu Rol</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleRoleSelect('alumno')}
        >
          <Text style={styles.buttonText}>Alumno</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleRoleSelect('profesor')}
        >
          <Text style={styles.buttonText}>Profesor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleRoleSelect('padre')}
        >
          <Text style={styles.buttonText}>Padre</Text>
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

export default Roles;