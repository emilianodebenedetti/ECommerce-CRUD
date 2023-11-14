import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from '@firebase/storage'
import { getFirestore } from '@firebase/firestore'
 

/* base de datos */
const firebaseConfig = {
  apiKey: "AIzaSyAwstK8mEXhzxns3hj1eB5Vbo3isKUAkOI",
  authDomain: "backend-proyect-e58f8.firebaseapp.com",
  projectId: "backend-proyect-e58f8",
  storageBucket: "backend-proyect-e58f8.appspot.com",
  messagingSenderId: "794506331196",
  appId: "1:794506331196:web:a02b0490dd9ee404b06f39"
};

//pasamos como parametro initial
const app = initializeApp(firebaseConfig);

console.log('Firebase App inicializado:', app);

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app);

export default app;