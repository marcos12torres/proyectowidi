import React, { useEffect, useState } from 'react';
import { firestore } from '@/firebase'; // Asegúrate de importar firestore correctamente
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

// Define las interfaces
interface TrabajoPractico {
  nombre: string; // Nombre del trabajo práctico
  entregado: boolean; // Estado de entrega
}

interface Alumno {
  id: string; // Identificador único del alumno
  nombre: string; // Nombre del alumno
  estado: string; // Estado del alumno (aprobado, desaprobado, etc.)
  comentarios: string; // Comentarios sobre el alumno
  trabajosPracticos: TrabajoPractico[]; // Lista de trabajos prácticos
}

interface Curso {
  id: string; // Identificador único del curso
  nombre: string; // Nombre del curso
  alumnos: Alumno[]; // Lista de alumnos en el curso
}

const ProfesorScreen: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]); // Estado para los cursos

  // Función para cargar cursos desde Firestore
  const loadCursos = async () => {
    const cursosCollection = collection(firestore, 'cursos');
    const cursosSnapshot = await getDocs(cursosCollection);
    const cursosData = cursosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Curso, 'id'>), // Asegúrate de que la estructura coincida
    }));
    setCursos(cursosData);
  };

  // Llama a la función de carga en el efecto
  useEffect(() => {
    loadCursos();
  }, []);

  // Función para agregar un alumno a un curso
  const agregarAlumno = async (cursoId: string, nuevoAlumno: Alumno) => {
    const curso = cursos.find((curso) => curso.id === cursoId);
    if (curso) {
      // Agrega el nuevo alumno localmente
      curso.alumnos.push(nuevoAlumno);

      // Actualiza el curso en Firestore
      const cursoRef = doc(firestore, 'cursos', cursoId);
      await updateDoc(cursoRef, {
        alumnos: curso.alumnos
      });
      
      // Actualiza el estado local
      setCursos([...cursos]);
    }  
  };

  // Estilos en línea
  const styles = {
    container: {
      padding: '20px',
    },
    title: {
      fontSize: '24px',
      color: '#333',
    },
    courseList: {
      listStyleType: 'none',
      padding: '0',
    },
    courseItem: {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    addButtonHover: {
      backgroundColor: '#218838',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Cursos</h1>
      <ul style={styles.courseList}>
        {cursos.map(curso => (
          <li key={curso.id} style={styles.courseItem}>
            {curso.nombre}
            <button
              style={styles.addButton}
              onClick={() => agregarAlumno(curso.id, { 
                id: 'nuevo', 
                nombre: 'Nuevo Alumno', 
                estado: 'en curso', 
                comentarios: '', 
                trabajosPracticos: [] 
              })}
            >
              Agregar Alumno
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfesorScreen;
