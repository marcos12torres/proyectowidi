import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView, // Add ScrollView
} from 'react-native';

const Inicio = () => {
  return (
    <ScrollView> // Wrap the content inside ScrollView
      <View style={styles.container}>
        {/* Imágenes de fondo redondas */}
        <View style={styles.circleBackgroundTop}></View>
        <View style={styles.circleBackgroundBottom}></View>

        <View style={styles.header}>
          <Text style={styles.logo}>BiznesZone</Text>
          <View style={styles.menu}>
            <Text style={styles.menuItem}>Start</Text>
            <Text style={styles.menuItem}>About Us</Text>
            <Text style={styles.menuItem}>Services</Text>
            <Text style={styles.menuItem}>Contact</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>We Create Solutions for Your Business</Text>
          <Text style={styles.heroDescription}>
            Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Mauris in erat justo.
            Nullam ac urna eu felis dapibus condimentum. Sed sit
            amet a augue. Sed non mauris vitae erat consequat
            ipsum, nec sagittis sem nibh id elit, sed non mauris vitae erat.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.services}>
          <Text style={styles.sectionTitle}>We Provide the Best Services</Text>
          <View style={styles.servicesContainer}>
            <View style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>SEO/SEM</Text>
              <Text style={styles.serviceDescription}>
                Nullam ac urna eu felis dapibus condimentum sit amet
                a augue. Sed non mauris vitae erat consequat ipsum,
                nec sagittis sem nibh id elit, sed non mauris vitae erat.
              </Text>
            </View>
            <View style={styles.serviceCard}>
              <Image source={require('./img/libro.jpg')} style={styles.serviceIcon} />
              <Text style={styles.serviceTitle}>Marketing</Text>
              <Text style={styles.serviceDescription}>
                Nullam ac urna eu felis dapibus condimentum sit amet
                a augue. Sed non mauris vitae erat consequat ipsum,
                nec sagittis sem nibh id elit, sed non mauris vitae erat.
              </Text>
            </View>
            <View style={styles.serviceCard}>
              <Image source={require('./img/libro.jpg')} style={styles.serviceIcon} />
              <Text style={styles.serviceTitle}>Viral Campaign</Text>
              <Text style={styles.serviceDescription}>
                Nullam ac urna eu felis dapibus condimentum sit amet
                a augue. Sed non mauris vitae erat consequat ipsum,
                nec sagittis sem nibh id elit, sed non mauris vitae erat.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.simpleSolutions}>
          <Text style={styles.sectionTitle}>Simple Solutions!</Text>
          <Text style={styles.simpleDescription}>
            Aenean sollicitudin, lorem quis bibendum auctor, nisi elit
            consequat ipsum, nec sagittis sem nibh id elit, sed non
            mauris vitae erat.
          </Text>
          <View style={styles.steps}>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepTitle}>Contact us</Text>
              <Text style={styles.stepDescription}>
                Nullam ac urna eu felis dapibus condimentum sit amet a
                augue.
              </Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepTitle}>Consult</Text>
              <Text style={styles.stepDescription}>
                Nullam ac urna eu felis dapibus condimentum sit amet a
                augue.
              </Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepTitle}>Place order</Text>
              <Text style={styles.stepDescription}>
                Duis sed odio sit amet nibh vulputate cursus a sit
                amet mauris.
              </Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepTitle}>Payment</Text>
              <Text style={styles.stepDescription}>
                Duis sed odio sit amet nibh vulputate cursus a sit
                amet mauris.
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Read More</Text>
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
  circleBackgroundTop: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    backgroundColor: '#d6eaf8',
    borderRadius: 150,
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
    backgroundColor: '#2980B9',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  menu: {
    flexDirection: 'row',
  },
  menuItem: {
    color: '#fff',
    marginRight: 20,
    fontWeight: 'bold',
  },
  hero: {
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  heroDescription: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#34495e',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  services: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '30%',
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 25, // Hacer la imagen redonda
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2980B9',
  },
  serviceDescription: {
    textAlign: 'center',
    color: '#34495e',
  },
  simpleSolutions: {
    padding: 20,
  },
  simpleDescription: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#34495e',
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  step: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '20%',
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2980B9',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2980B9',
  },
  stepDescription: {
    textAlign: 'center',
    color: '#34495e',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default Inicio;
