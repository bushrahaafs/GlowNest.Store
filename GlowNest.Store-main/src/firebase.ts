import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7dkChsWX8WFVLXWIKgmb4eI3KPcjRzkE",
  authDomain: "glownest-store.firebaseapp.com",
  projectId: "glownest-store",
  storageBucket: "glownest-store.appspot.com",
  messagingSenderId: "348969280535",
  appId: "1:348969280535:web:66241d198cb9086f13a852"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

