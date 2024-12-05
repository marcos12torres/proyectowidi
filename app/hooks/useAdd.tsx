import { collection, addDoc } from 'firebase/firestore';
import { db } from '../app/auth/firebase';

interface AddHookResult {
  addDocument: (collectionName: string, data: any) => Promise<string>;
}

export const useAdd = (): AddHookResult => {
  const addDocument = async (collectionName: string, data: any): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error al agregar documento:', error);
      throw error;
    }
  };

  return { addDocument };
};