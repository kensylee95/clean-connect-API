import { authRepoErrorHandler } from "../../errorHandlers/authRepositoryErrorHandler";
import UserModel from "../../models/userModel";
import { signInWithEmailAndPassword as authSignInWithEmail, firebaseAuth } from "../../services/firebaseService";


async function signInWithEmailAndPassword({ email, password }: UserModel){
  try {
    // Sign in using Firebase Authentication
    const userCredential = await authSignInWithEmail(firebaseAuth, email, password!);
    // Signed in successfully
    const user = userCredential.user;
    return user;
  } catch (error) {
   // Handle Firebase authentication errors
   const { status, message } = authRepoErrorHandler(error);
    throw({"status":status, "message":message});
  }
}
 export default signInWithEmailAndPassword;
