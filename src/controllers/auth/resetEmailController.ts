import { Request, Response,} from "express";
import { firebaseAuth } from "../../services/firebaseService";
import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { applicationRootUrl } from "../../../config";

//1. method that handles sending reset email to user
export async function sendResetEmail(req:Request, res:Response){

    try {
 //get email from request body
    const { email,}:{email:string,} = req.body;

      // Send password reset email
      await sendPasswordResetEmail(firebaseAuth, email,);
      //return success response after sending email
      res.status(200).json({ message: 'If an account exists for this email address, you will receive a reset email' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      res.status(500).json({ error: 'Error sending password reset email' });
    }
};


//2. verify reset email and redirect  when user clicks link from already sent email
export async function verifyEmail(req:Request, res:Response){

//get oobCode from request params
  const confirmationCode = req.params.oobCode;
  const mode = req.params.mode;
  switch (mode) {
    case "resetPassword":    
  try {
    //url to redirect to front end route with the code as query params
    const url = `${applicationRootUrl}/user/verify-email?code=${confirmationCode}}`
    //redirect to route
      res.redirect(302, url);
    } catch (error) {
      console.error('Error occured:', error);
      res.status(500).json({ error: 'Could not validate' });
    }
      break;
      case "verifyEmail":
        //  
    default:
      break;
  }
 
};

 
//3. method that handles sending reset email to user
export async function resetPassword(req:Request, res:Response){

  try {
//get newpassword & confirmation code from request body
  const { confirmationCode, newPassword}:{confirmationCode:string, newPassword:string} = req.body;

    // Confirm and reset password
    await confirmPasswordReset(firebaseAuth, confirmationCode, newPassword);
    //return success response after resetting password
    res.status(200).json({ message: 'Your password reset was successful' });
  } catch (error) {
    console.error('Error occured:', error);
    res.status(500).json({ error: 'Could not reset email' });
  }
};