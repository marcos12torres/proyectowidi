import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { useFonts } from 'expo-font';
import { Inconsolata_400Regular } from '@expo-google-fonts/inconsolata';

const Inicio = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.logo}>Seguim</Text>
          <View style={styles.menu}>
            {/*<Text style={styles.menuItem}>Start</Text>
            <Text style={styles.menuItem}>About Us</Text>
            <Text style={styles.menuItem}>Services</Text>
            <Text style={styles.menuItem}>Contact</Text>*/}
          </View>
        </View>
        {/* Add the image with rounded borders and blue margin */}
        <View style={styles.imageContainer}>
          <Image source={require('./img/imagen.jpg')} style={styles.image} />
        </View>

        {/* Imágenes de fondo redondas */}
        <View style={styles.circleBackgroundTop}>
        <Text style={styles.Cajitaparaelcirculo}>En SEGUIM, ofrecemos una solución innovadora para mejorar el seguimiento académico de los estudiantes. Nuestra plataforma está diseñada para que profesores, padres y estudiantes puedan visualizar el progreso y el rendimiento en distintas materias de manera clara y organizada.</Text>
        </View>
        <View style={styles.circleBackgroundBottom}></View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Creamos una solucion para llevar a cabo el registro de los estudiantes de una forma digital</Text>
          <Text style={styles.heroDescription}>
            Seguim permite una mejor comunicación entre profesor, estudiante y padres obteniendo una mayor facilidad para visualizar los registro
          </Text>
        </View>

        <View style={styles.services}>
          <Text style={styles.sectionTitle}>PROVEEMOS LOS MEJORES SERVICIO</Text>
          <View style={styles.servicesContainer}>
            <View style={styles.serviceCard}>
            <Image source={require('./img/imagen.jpg')} style={styles.serviceIcon} />
              <Text style={styles.serviceTitle}>Usuarios principales</Text>
              <Text style={styles.serviceDescription}>
              Profesores: Pueden realizar un seguimiento detallado de cada estudiante en las distintas materias que dictan. <br />
Padres: Pueden revisar el desempeño académico de sus hijos, accediendo a datos de rendimiento, notas y progreso en tiempo real. <br />
Estudiantes: Les permite ver su propio progreso académico, ayudándoles a identificar áreas donde necesitan mejorar. <br />
              </Text>
            </View>
            <View style={styles.serviceCard}>
              <Image source={require('./img/imagen.jpg')} style={styles.serviceIcon} />
              <Text style={styles.serviceTitle}>Funcionalidades</Text>
              <Text style={styles.serviceDescription}>
              Interfaz Educativa: El diseño tiene un enfoque visual adecuado para el contexto educativo, incluyendo un encabezado claro, botones de acción, descripciones concisas, e incluso imágenes.
              </Text>
            </View>
            <View style={styles.serviceCard}>
              <Image source={require('./img/imagen.jpg')} style={styles.serviceIcon} />
              <Text style={styles.serviceTitle}>Funcionalidades para estudiates</Text>
              <Text style={styles.serviceDescription}>
              Acceso a materiales: Sección donde los estudiantes puedan descargar o consultar materiales de estudio, como PDFs, guías, presentaciones o vídeos subidos por los profesores.
Notificaciones automáticas: Alertas para recordar a los estudiantes las fechas de entrega de tareas o próximas evaluaciones. <br />
Seguimiento personal: Un panel de control personalizado donde los estudiantes puedan ver sus logros, objetivos alcanzados y tareas pendientes.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.simpleSolutions}>
          <Text style={styles.sectionTitle}>Para usar nuestra app debes de....</Text>
          <Text style={styles.simpleDescription}>
          </Text>
          <View style={styles.steps}>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepTitle}>Registrarte</Text>
              <Text style={styles.stepDescription}>
                A través del login definir además el tipo de usuario, profesor, alumno, padre, etc
              </Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepTitle}>Dependiendo del tipo de usuario</Text>
              <Text style={styles.stepDescription}> Tendrás una interfaz distinta. Por ejemplo, si eres profesor, debes cargar tus datos, si eres padre o alumno solo debes esperar las actualizaciones
              </Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepTitle}>Visualización</Text>
              <Text style={styles.stepDescription}>
                Del estado del alumno, sus materias, comentarios, trabajos prácticos, cuaderno de comunicaciones y más
              </Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepTitle}>Actualización constante</Text>
              <Text style={styles.stepDescription}>
              La planilla de seguimiento se actualiza semanalmente por lo tanto, nueva información podrá checkearse
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            {/*
            aca queremos poner un login
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>*/}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Acerca de nosotros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    position: 'relative',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 20,
    marginBottom: 40, // Add some space between the image and the rest of the content
    backgroundColor: '#ADD8E6', // Blue margin
    borderRadius: 10, // Rounded borders
    padding: 10,
  },
  image: {
    width: 700, // Medium size
    height: 500,
    borderRadius: 10, // Rounded borders
    alignSelf: 'flex-end',
  },
  circleBackgroundTop: {
    position: 'relative',
    top: -500,
    right: -160,
    width: 500,
    height: 400,
    backgroundColor: '#70C5CE',
    borderRadius: 150,
    textAlign:'center',
  },
  Cajitaparaelcirculo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    top: 50,
    
  },
  circleBackgroundBottom: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    backgroundColor: '#d6eaf8',
    borderRadius: 150,
  },
  header: {
    backgroundColor: '#11787D',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 18,
    color: '#fff',
    marginRight: 20,
  },
  hero: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2980B9',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  services: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  serviceCard: {
    width: '30%',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 16,
    color: '#666',
  },
  simpleSolutions: {
    padding: 20,
    backgroundColor: '#fff',
  },
  simpleDescription: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  step: {
    width: '20%',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Inicio;