import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../app/auth/firebase';

export const useDelete = () => {
  const eliminarMiembroEquipo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'equipo', id));
    } catch (error) {
      console.error('Error al eliminar miembro:', error);
      throw error;
    }
  };

  const eliminarLogro = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'logros', id));
    } catch (error) {
      console.error('Error al eliminar logro:', error);
      throw error;
    }
  };

  return { eliminarMiembroEquipo, eliminarLogro };
};