import {doc, getDoc } from 'firebase/firestore';
import UserModel from '../../models/userModel';
import { firestoreDB} from '../../services/firebaseService';
import { User } from 'firebase/auth';

async function getUserByIdRepository(id:User["uid"]){
const collectionName:string = 'users';
    try {
        const docRef = doc(firestoreDB, collectionName, id);
        const document = await getDoc(docRef);
        if (!document.exists) {
        throw ("user not found");
        } else {
          return document.data() as UserModel;
        }
      }
    catch (error){
      throw (error);
    }
  }
export default getUserByIdRepository;