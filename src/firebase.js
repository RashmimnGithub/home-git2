// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8BQ50P-ecmW-SmdcZGEyetxa1jiI_B8A",
    authDomain: "web-app-20ba1.firebaseapp.com",
    projectId: "web-app-20ba1",
    storageBucket: "web-app-20ba1.appspot.com",
    messagingSenderId: "434062989208",
    appId: "1:434062989208:web:2848eec0b7b8a3c8c07ded"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
