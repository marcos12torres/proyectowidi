import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../app/auth/firebase';

interface DeleteHookResult {
  deleteDocument: (collectionName: string, id: string) => Promise<void>;
}

export const useDelete = (): DeleteHookResult => {
  const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      throw error;
    }
  };

  return { deleteDocument };
};