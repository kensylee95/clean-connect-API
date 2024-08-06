
import { Request, Response, } from "express";
import UserModel from "../../models/userModel";
import { getAuth, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../services/firebaseService";
import getUserByIdRepository from "../../repositories/userRepository/getUserByIdRepository";

export async function login(
  req: Request,
  res: Response,
) {
  try {
    const { email, password, }: UserModel = req.body;
    // Authenticate user with Firebase
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password!);
    //get authenticated user
    const authenticatedUser = userCredential.user;
    //fetch firestore DB records of authenticated user 
    const userModel = await getUserByIdRepository(authenticatedUser.uid);
    // Save authenticated user model in session.
    req.session.user = userModel;
    //return successful response containing authenticated user.
    return res.status(200).json({ message: 'User logged in successfully', user: req.session.user });
  } catch (error) {
    //return aunthentication error
    res.status(401).json({ message: 'Authentication failed', error: error });
  }
}

//sign out user
export async function signOutUser(
  req:Request,
  res: Response,
) {
  try {
    await signOut(firebaseAuth);
    req.session.destroy;
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'User logged out successfully', });
    }catch(error){
      return res.status(500).json({ error: 'Oops! Something went wrong. try again', });
    }
}

