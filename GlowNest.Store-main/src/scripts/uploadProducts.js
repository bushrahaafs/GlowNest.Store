import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { products } from './products.js';


// ✅ Firebase Config تبع مشروعك
const firebaseConfig = {
  apiKey: "AIzaSyD7dkChsWX8WFVLXWIKgmb4eI3KPcjRzkE",
  authDomain: "glownest-store.firebaseapp.com",
  projectId: "glownest-store",
  storageBucket: "glownest-store.appspot.com",
  messagingSenderId: "348969280535",
  appId: "1:348969280535:web:66241d198cb9086f13a852"
};

// ✅ تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ رفع المنتجات من ملف products.ts إلى Firestore
const uploadProducts = async () => {
  for (const product of products) {
    try {
      await setDoc(doc(db, 'products', product.id.toString()), product);
      console.log(`✅ Added: ${product.nameKey}`);
    } catch (error) {
      console.error(`❌ Failed to add: ${product.nameKey}`, error);
    }
  }
};

uploadProducts();

