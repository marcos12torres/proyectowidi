import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../app/auth/firebase';

interface UpdateHookResult {
  updateDocument: (collectionName: string, id: string, data: any) => Promise<void>;
}

export const useUpdate = (): UpdateHookResult => {
  const updateDocument = async (collectionName: string, id: string, data: any): Promise<void> => {
    try {
      await updateDoc(doc(db, collectionName, id), data);
    } catch (error) {
      console.error('Error al actualizar documento:', error);
      throw error;
    }
  };

  return { updateDocument };
};