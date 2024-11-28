import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [teacherCode, setTeacherCode] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    if (role === 'profesor') {
      setShowTeacherModal(true);
    }
  };

  const handleSignup = async () => {
    if (!selectedRole) {
      setError('Por favor seleccione un rol');
      return;
    }

    if (selectedRole === 'profesor' && !teacherCode) {
      setError('Código de profesor requerido');
      return;
    }

    try {
      // Aquí iría la lógica de registro con Firebase
      console.log('Registrando usuario:', { email, password, selectedRole, teacherCode });
      navigation.navigate('Iniciar sesión' as never);
    } catch (error) {
      setError('Error en el registro');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.title}>Registro</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedRole}
            onValueChange={handleRoleSelect}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione su rol" value="" />
            <Picker.Item label="Alumno" value="alumno" />
            <Picker.Item label="Profesor" value="profesor" />
            <Picker.Item label="Padre" value="padre" />
          </Picker>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

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
              placeholderTextColor="#666"
            />
            <TouchableOpacity 
              style={styles.button}
              onPress={() => setShowTeacherModal(false)}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
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
    height: 550, // Aumentado para dar espacio al picker
    borderRadius: 300,
    backgroundColor: '#11787D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  pickerContainer: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 10,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 40,
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
  errorText: {
    color: '#ff0000',
    marginVertical: 10,
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
    marginBottom: 15,
    color: '#11787D',
  },
});

export default Signup;