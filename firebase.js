import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA05OiuBSmfCgYOPt_Cs4oLmeRUJGx1Uec",
    authDomain: "amjon-2.firebaseapp.com",
    projectId: "amjon-2",
    storageBucket: "amjon-2.appspot.com",
    messagingSenderId: "166582458371",
    appId: "1:166582458371:web:1c64c840670442b0435636",
    measurementId: "G-8T00TQCJ2F"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

export default db