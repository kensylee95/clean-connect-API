import { Request, Response } from "express";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../../services/firebaseService";

// this method that handles sending reset email to user
 async function sendResetEmail(req:Request, res:Response){

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
export default sendResetEmail;
