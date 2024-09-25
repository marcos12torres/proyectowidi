import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const Inicio = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.logo}>Seguim</Text>
          <View style={styles.menu}>
            <Text style={styles.menuItem}>Start</Text>
            <Text style={styles.menuItem}>About Us</Text>
            <Text style={styles.menuItem}>Services</Text>
            <Text style={styles.menuItem}>Contact</Text>
          </View>
        </View>
        {/* Add the image with rounded borders and blue margin */}
        <View style={styles.imageContainer}>
          <Image source={require('./img/libro.jpg')} style={styles.image} />
        </View>

        {/* Imágenes de fondo redondas */}
        <View style={styles.circleBackgroundTop}>
        <Text style={styles.Cajitaparaelcirculo}>Start</Text>
        </View>
        <View style={styles.circleBackgroundBottom}></View>



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
    top: 100,
    
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