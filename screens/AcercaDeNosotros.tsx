//view es un componente que se usa para crear vistas en la pantalla.
//Text es un componente que se usa para crear texto en la pantalla.
//Image es un componente que se usa para crear imágenes en la pantalla.
//StyleSheet es un componente que se usa para crear estilos en la pantalla.
//ScrollView es un componente que se usa para crear una lista de elementos en la pantalla.

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';

const { width } = Dimensions.get('window');

const AcercaDeNosotros = () => { //llamando a AcercaDeNosotros.tsx
  const equipo = [
    { nombre: 'Dr. Juan Pérez', cargo: 'Director', años: 15 },
    { nombre: 'Lic. María López', cargo: 'Vicedirectora', años: 12 },
  ];

  const logros = [
    { año: '2023', descripcion: 'Premio Nacional de Innovación Educativa' },
    { año: '2022', descripcion: 'Certificación ISO 9001' },
    { año: '2021', descripcion: 'Reconocimiento por Excelencia Académica' },
  ];

  const proyectos = [
    { titulo: 'Laboratorio Digital', descripcion: 'Implementación de tecnología de última generación' },
    { titulo: 'Eco-Escuela', descripcion: 'Proyecto de sustentabilidad ambiental' },
    { titulo: 'Intercambio Cultural', descripcion: 'Programa de intercambio internacional' },
  ];

  const infoGeneral = {
    añoFundacion: 1990,
    historia: 'Desde nuestra fundación en 1990, nos hemos dedicado a la excelencia educativa, formando líderes del mañana con valores sólidos y una educación integral.',
    mision: 'Nuestra misión es formar líderes del mañana con valores sólidos y una educación integral.',
    vision: 'Nuestra visión es ser líderes en innovación educativa y sustentabilidad ambiental.',
  };

  const cursosTemporales = [
    {
      titulo: 'Programación para Niños',
      duracion: '2 meses',
      modalidad: 'Presencial',
      horario: 'Sábados 9:00-12:00',
      descripcion: 'Introducción al pensamiento computacional y programación básica'
    },
    {
      titulo: 'Inglés Intensivo',
      duracion: '3 meses',
      modalidad: 'Híbrido',
      horario: 'Lunes y Miércoles 16:00-18:00',
      descripcion: 'Preparación para certificaciones internacionales'
    },
    {
      titulo: 'Robótica Básica',
      duracion: '6 semanas',
      modalidad: 'Presencial',
      horario: 'Viernes 15:00-17:00',
      descripcion: 'Introducción a la robótica y automatización'
    },
    {
      titulo: 'Arte Digital',
      duracion: '2 meses',
      modalidad: 'Virtual',
      horario: 'Martes y Jueves 17:00-19:00',
      descripcion: 'Diseño gráfico y herramientas digitales'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Banner Principal */}
      <ImageBackground 
        source={require('../app/img/edificio-escolar.png')} 
        style={styles.banner}
      >
        <View style={styles.overlay}>
          <Image source={require('../app/img/logo.png')} style={styles.logo} />
          <Text style={styles.mainTitle}>Nuestra Historia Educativa</Text>
          <Text style={styles.subTitle}>Formando líderes desde {infoGeneral.añoFundacion}</Text>
        </View>
      </ImageBackground>

      {/* Historia y Valores */}
      <View style={styles.infoSection}>
        <Card style={styles.historiaCard}>
          <Card.Content style={styles.historiaContent}>
            <Title style={styles.historiaTitulo}>Nuestra Historia</Title>
            <Paragraph style={styles.historiaTexto}>{infoGeneral.historia}</Paragraph>
          </Card.Content>
        </Card>
        
        <View style={styles.valoresContainer}>
          <Card style={styles.valorCard}>
            <Card.Content>
              <Title>Misión</Title>
              <Paragraph>{infoGeneral.mision}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.valorCard}>
            <Card.Content>
              <Title>Visión</Title>
              <Paragraph>{infoGeneral.vision}</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Nuestro Equipo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuestro Equipo Directivo</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {equipo.map((miembro, index) => (
            <View key={index} style={styles.equipoCard}>
              <Image source={require('../app/img/user.png')} style={styles.equipoFoto} />
              <Text style={styles.equipoNombre}>{miembro.nombre}</Text>
              <Text style={styles.equipoCargo}>{miembro.cargo}</Text>
              <Text style={styles.equipoAños}>{miembro.años} años en la institución</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Logros y Reconocimientos */}
      <View style={styles.logrosSection}>
        <Text style={styles.sectionTitle}>Logros y Reconocimientos</Text>
        {logros.map((logro, index) => (
          <View key={index} style={styles.logroCard}>
            <Text style={styles.logroAño}>{logro.año}</Text>
            <Text style={styles.logroDesc}>{logro.descripcion}</Text>
          </View>
        ))}
      </View>

      {/* Proyectos Actuales */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proyectos Actuales</Text>
        {proyectos.map((proyecto, index) => (
          <TouchableOpacity key={index} style={styles.proyectoCard}>
            <Text style={styles.proyectoTitle}>{proyecto.titulo}</Text>
            <Text style={styles.proyectoDesc}>{proyecto.descripcion}</Text>
            <MaterialIcons name="arrow-forward" size={24} color="#2c3e50" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Cursos Temporales */}
      <View style={styles.cursosSection}>
        <Text style={styles.sectionTitle}>Cursos Temporales</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cursosTemporales.map((curso, index) => (
            <View key={index} style={styles.cursoCard}>
              <View style={styles.cursoHeader}>
                <Text style={styles.cursoTitulo}>{curso.titulo}</Text>
                <View style={styles.modalidadBadge}>
                  <Text style={styles.modalidadText}>{curso.modalidad}</Text>
                </View>
              </View>
              <Text style={styles.cursoDuracion}>Duración: {curso.duracion}</Text>
              <Text style={styles.cursoHorario}>Horario: {curso.horario}</Text>
              <Text style={styles.cursoDescripcion}>{curso.descripcion}</Text>
              <TouchableOpacity style={styles.inscribirseBtn}>
                <Text style={styles.inscribirseBtnText}>Inscribirse</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Redes Sociales */}
      <View style={styles.redesSection}>
        <Text style={styles.sectionTitle}>Síguenos en Redes</Text>
        <View style={styles.redesContainer}>
          <TouchableOpacity style={styles.redSocialBtn}>
            <FontAwesome5 name="facebook" size={24} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.redSocialBtn}>
            <FontAwesome5 name="instagram" size={24} color="#c13584" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.redSocialBtn}>
            <FontAwesome5 name="twitter" size={24} color="#1da1f2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contacto */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contacto</Text>
        <View style={styles.contactInfo}>
          <MaterialIcons name="location-on" size={24} color="#2c3e50" />
          <Text style={styles.contactText}>Av. Principal 123, Ciudad</Text>
        </View>
        <View style={styles.contactInfo}>
          <MaterialIcons name="phone" size={24} color="#2c3e50" />
          <Text style={styles.contactText}>(123) 456-7890</Text>
        </View>
        <View style={styles.contactInfo}>
          <MaterialIcons name="email" size={24} color="#2c3e50" />
          <Text style={styles.contactText}>contacto@escuela.edu</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    height: 300,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  valoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  valorCard: {
    alignItems: 'center',
    padding: 15,
  },
  valorTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  equipoCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    elevation: 3,
  },
  equipoFoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  equipoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  equipoCargo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  equipoAños: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  logrosSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  logroCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logroAño: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 15,
    color: '#2c3e50',
  },
  logroDesc: {
    fontSize: 14,
    flex: 1,
  },
  proyectoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proyectoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  proyectoDesc: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginHorizontal: 10,
  },
  redesSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  redesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  redSocialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#2c3e50',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  historiaCard: {
    marginBottom: 20,
    elevation: 3,
    backgroundColor: '#fff',
  },
  historiaContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  historiaTitulo: {
    textAlign: 'center',
    marginBottom: 10,
  },
  historiaTexto: {
    textAlign: 'center',
    lineHeight: 24,
  },
  cursosSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  cursoCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cursoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cursoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  modalidadBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  modalidadText: {
    color: '#1976d2',
    fontSize: 12,
    fontWeight: '500',
  },
  cursoDuracion: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  cursoHorario: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 10,
  },
  cursoDescripcion: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  inscribirseBtn: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  inscribirseBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AcercaDeNosotros;