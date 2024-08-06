import { Request, Response } from "express";
import { firebaseAuth } from "../../services/firebaseService";
import { confirmPasswordReset } from "firebase/auth";

//3. method that handles sending reset email to user
async function resetPassword(req:Request, res:Response){
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
  export default resetPassword;