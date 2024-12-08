import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../app/auth/firebase';

export const useUpdate = () => {
  const editarMiembroEquipo = async (id: string, miembroActualizado: any) => {
    try {
      await updateDoc(doc(db, 'equipo', id), miembroActualizado);
    } catch (error) {
      console.error('Error al editar miembro:', error);
      throw error;
    }
  };

  const editarLogro = async (id: string, logroActualizado: any) => {
    try {
      await updateDoc(doc(db, 'logros', id), logroActualizado);
    } catch (error) {
      console.error('Error al editar logro:', error);
      throw error;
    }
  };

  return { editarMiembroEquipo, editarLogro };
};