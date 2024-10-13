import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
/*cambio1
cambiodos
cambiotres
cabiocuatro
cambiocinco
cambio6
cambioseven7
camibio quiero dormir}
una oveja
dosovejas
tresovejas
cuatroovejas
cincoobejas
seisovejas
sieteovejas
ochoovejas
nueve ovejas ya tengo sueño*/

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <FontAwesome name="facebook" size={20} color="#4CAF50" />
        </View>
        <Text style={styles.buttonText}>facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <FontAwesome name="google" size={20} color="#4CAF50" />
        </View>
        <Text style={styles.buttonText}>google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <FontAwesome name="twitter" size={20} color="#4CAF50" />
        </View>
        <Text style={styles.buttonText}>twitter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="gmail" size={20} color="#4CAF50" />
        </View>
        <Text style={styles.buttonText}>gmail</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot Password</Text>
      <Text style={styles.forgotPasswordLink}>www.reallygreatsite.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2DFDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, // Hace que los botones sean más altos
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginVertical: 10,
    width: '25%', // Ajusta el ancho de los botones
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 15,
    backgroundColor: '#E0F2F1',
    padding: 8,
    borderRadius: 25,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  forgotPassword: {
    marginTop: 20,
    fontSize: 14,
    color: '#4CAF50',
  },
  forgotPasswordLink: {
    fontSize: 12,
    color: '#4CAF50',
  },
});

export default LoginScreen;
