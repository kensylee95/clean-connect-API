import { Request, Response,} from "express";
import UserModel from "../../models/userModel";
import addUserRepository from "../../repositories/userRepository/addUserRepository";
import { FirebaseError } from "firebase/app";
import logger from "../../services/winstonLogger";
import { sendEmailVerification, UserCredential } from "firebase/auth";
import signUpWithEmailAndPassword from "../../repositories/auth_repository/signUpRepository";



async function registrationController(
  req: Request,
  res: Response,
) {
  try {
    const currentDate:Date = new Date();
    //Destructure request body to get params
    const {role, password, phoneNumber, email, fullName }: UserModel = req.body;
    //implements firebase auth sign up method
    const userCredential:UserCredential = await signUpWithEmailAndPassword({email:email, password:password!});
    //send email verification
    await  sendEmailVerification(userCredential.user);
    //Get Signed up user id
    const id = userCredential.user.uid;
    //create user model from signed up user records
    const user:UserModel = {id:id, role:role, email:email, phoneNumber:phoneNumber, fullName:fullName, createdAt:currentDate};
    //save user details with the signed in UID
    await addUserRepository({...user});
    //Exclude sensitive fields eg: password etc... from UserModel data to be returned as response to UI
    const { password:userPassword, ...sanitizedData} = user;
    //return succesful response
    return res.status(201).json({message: "User created successfully", success: true, user: sanitizedData, });
  } catch (error) {
    // Return a readable error response
    if (error instanceof FirebaseError) {
          //log errors
    logger.error(error);
      //Some firebase-specific error handling
      switch (error.code) {
        case "auth/network-request-failed":
          return res.status(500).json({ error: "Request time out. Please ensure you are connected to the internet.",});
          break;
          case "auth/weak-password":
            return res.status(500).json({ error: "Password must exceed six characters.",});
            break;
            case "auth/missing-email":
              return res.status(500).json({ error: "A valid email is required.",});
              break;
            case "auth/invalid-email":
              return res.status(500).json({ error: "The provided email is not valid.",});
              break;
            case "auth/email-already-exists":
              return res.status(500).json({ error: "An account already exist with this email address.",});
              break;
        default:
          return res.status(500).json({ error: error.message,});
          break;
      }
     

    }  else if (error instanceof Error) { 
      //log errors
      logger.error(error.message); 
      // Return a readable error response for unknown errors
      return res.status(500).json({ error: error.message, stack:error.stack });
    }
    else{
      return res.status(500).json({error:error});
    }
  }
}

export default registrationController;
