import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface Product {
  id: number;
  nameKey: string;
  descriptionKey: string;
  price: number;
  category: string;
  image: string;
}

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const q = query(collection(db, 'products'), where('category', '==', category));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    ...(doc.data() as Product),
    id: Number(doc.id),
  }));
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const ref = doc(db, 'products', id);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return { ...(snapshot.data() as Product), id: Number(id) };
  }

  return null;
};

