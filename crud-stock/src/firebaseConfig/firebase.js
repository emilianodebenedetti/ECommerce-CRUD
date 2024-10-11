import { initializeApp } from "firebase/app";
import { getStorage } from '@firebase/storage'
import { getFirestore } from '@firebase/firestore'
 

/* base de datos */
const firebaseConfig = {
  apiKey: "AIzaSyAPxhDCJ1_shUtPelaE3hQliQXXlk_kgog",
  authDomain: "e-commerce-reactjs-971e5.firebaseapp.com",
  projectId: "e-commerce-reactjs-971e5",
  storageBucket: "e-commerce-reactjs-971e5.appspot.com",
  messagingSenderId: "777417866691",
  appId: "1:777417866691:web:93808b9f82a50dc8d51176"
};

//pasamos como parametro initial
const app = initializeApp(firebaseConfig);

console.log('Firebase App inicializado:', app);

export const db = getFirestore(app)
export const storage = getStorage(app)
/* export const auth = getAuth(app); */

export default app;