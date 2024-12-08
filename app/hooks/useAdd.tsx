import { collection, addDoc } from 'firebase/firestore';
import { db } from '../auth/firebase';

export const useAdd = () => {
  const agregarMiembroEquipo = async (miembro: any) => {
    try {
      const docRef = await addDoc(collection(db, 'equipo'), {
        ...miembro,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error al agregar miembro:', error);
      throw error;
    }
  };

  const agregarLogro = async (logro: any) => {
    try {
      const docRef = await addDoc(collection(db, 'logros'), logro);
      return docRef.id;
    } catch (error) {
      console.error('Error al agregar logro:', error);
      throw error;
    }
  };

  return { agregarMiembroEquipo, agregarLogro };
};