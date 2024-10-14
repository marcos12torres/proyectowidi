import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const PantallaProfesor = ({ route, NavigationContainer }) => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    // Aquí realizarías una petición a tu servidor para obtener la lista de alumnos del profesor
    // Ejemplo:
    fetch('https://tu-api/alumnos/profesor/' + route.params.idProfesor)
      .then(response => response.json())
      .then(data => setAlumnos(data))
      .catch(error => console.error(error));
  }, [route.params.idProfesor]);

  const renderItem = ({ item }) => (
    <View>
      <Text>Nombre: {item.nombre}</Text>
      <Text>Apellido: {item.apellido}</Text>
      <Button title="Ver Detalles" onPress={() => NavigationContainer.navigate('DetallesAlumno', { alumnoId: item.id })} />
    </View>
  );

  return (
    <View>
      <Text>Bienvenido, Profesor!</Text>
      <FlatList
        data={alumnos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PantallaProfesor;