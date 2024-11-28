import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Roles = () => {
  const navigation = useNavigation<any>();
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [teacherCode, setTeacherCode] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelect = (role: string) => {
    switch (role) {
      case 'alumno':
        navigation.navigate('Planilla de seguimiento1');
        break;
      case 'padre':
        navigation.navigate('Planilla de seguimiento2');
        break;
      case 'profesor':
        setShowTeacherModal(true); // Mostrar modal en lugar de navegar directamente
        break;
    }
  };

  const handleTeacherCode = () => {
    // Aquí puedes cambiar '1234' por el código que desees
    if (teacherCode === '1234') {
      setShowTeacherModal(false);
      setTeacherCode('');
      navigation.navigate('Profesor');
    } else {
      setError('Código incorrecto');
      // Opcional: limpiar el error después de 3 segundos
      setTimeout(() => setError(''), 3000);
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

      {/* Modal para código de profesor */}
      <Modal
        visible={showTeacherModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Código de Profesor</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el código"
              value={teacherCode}
              onChangeText={setTeacherCode}
              secureTextEntry
              keyboardType="numeric"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.modalButton]} 
                onPress={handleTeacherCode}
              >
                <Text style={styles.buttonText}>Verificar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.modalButton, styles.cancelButton]} 
                onPress={() => {
                  setShowTeacherModal(false);
                  setTeacherCode('');
                  setError('');
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11787D',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#11787D',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 10,
  },
});

export default Roles;