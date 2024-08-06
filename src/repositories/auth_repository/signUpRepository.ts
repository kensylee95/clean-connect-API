import { createUserWithEmailAndPassword,} from "firebase/auth";
import {firebaseAuth } from "../../services/firebaseService";
const logger = require('../../services/winstonLogger');

interface signUpwithEmailAndPasswordType{
  email:string,
  password:string,
}

async function signUpWithEmailAndPassword({email, password}:signUpwithEmailAndPasswordType){
  try {
    // Sign in using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential;
  } catch (error) {
   // Handle Firebase authentication errors
    throw(error);
  }
}
 export default signUpWithEmailAndPassword;
