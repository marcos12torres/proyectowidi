import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../app/auth/firebase';

interface ListHookResult {
  listDocuments: (collectionName: string, orderByField?: string) => Promise<any[]>;
}

export const useList = (): ListHookResult => {
  const listDocuments = async (collectionName: string, orderByField?: string): Promise<any[]> => {
    try {
      let q = query(collection(db, collectionName));
      
      if (orderByField) {
        q = query(collection(db, collectionName), orderBy(orderByField, 'desc'));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error al listar documentos:', error);
      throw error;
    }
  };

  return { listDocuments };
};