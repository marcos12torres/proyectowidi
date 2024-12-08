import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../app/auth/firebase';

export const useList = () => {
  const obtenerEquipo = async () => {
    try {
      const q = query(collection(db, 'equipo'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error al listar equipo:', error);
      throw error;
    }
  };

  const obtenerLogros = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'logros'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error al listar logros:', error);
      throw error;
    }
  };

  return { obtenerEquipo, obtenerLogros };
};