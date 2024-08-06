

import {doc, FirestoreError, setDoc } from 'firebase/firestore';
import { addUserRepoErrorHandler } from '../../errorHandlers/addUserRepoErrorHandler';
import UserModel from '../../models/userModel';
import { firestoreDB,} from '../../services/firebaseService';
async function addUserRepository(user:UserModel) {
const collectionName:string = 'users';
  try {
    const {id, fullName, email, role}= user;
    await setDoc(doc(firestoreDB, collectionName, user.id), {
      id,
      fullName,
      email,
      role,
    }); 
  } catch (error) {
    // Return a readable error response
    if (error instanceof FirestoreError) {
          // Handle the error using the error handler
    const { status, message,} = addUserRepoErrorHandler(error);
    throw ({"status":status, message:message});
    } else {
      // General error handling
      throw (error);
    }
  }
}

export default  addUserRepository;