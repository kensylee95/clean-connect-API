import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { firebaseConfig } from "../../config";

//initialize the firebase SDK
const app = initializeApp(firebaseConfig);

//export services 
//firebase firestore
const firestoreDB = getFirestore(app);

const firebaseAuth = getAuth(app);

export {firestoreDB, firebaseAuth, signInWithEmailAndPassword}