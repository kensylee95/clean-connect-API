import { Request, Response,} from "express";
import { applicationRootUrl } from "../../config";
import { applyActionCode } from "firebase/auth";
import { firebaseAuth } from "../../services/firebaseService";
import { loginRedirectUrl } from "../../constants/urlLinks";
import { handleEmailVerification } from "../../helpers/handleEmailVerification";

//Verify sent verification on sign up and on reset email by a user. 
async function verifyEmail(req:Request, res:Response){
//get oobCode from request params
  const {oobCode, mode}  = req.query;
  //if mode or confirmation code is empty return error response
  if (!oobCode || !mode) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  switch (mode) {
    //----------------------------------------------------------------------------------------
    //Case 1 --> If mode is equal to "resetPassword" - [This section handles the reset email].
    //typical happens when user attempts to reset there password.
    case "resetPassword":
    try {
    //url to redirect to front end route with the code as query params
    const url = `${applicationRootUrl}/user/reset-email?code=${oobCode}`
    //redirect to route
      res.redirect(302, url);
    } catch (error) {
      console.error('Error occured:', error);
      res.status(500).json({ error: 'Could not validate' });
    }
      break;
//-----------------------------------------------------------------------------
   //Case 2 --> if mode is equal to "verifyEmail"
   //This section handles the email verification which typical happen when user signs up for the first time.
      case "verifyEmail":
      await handleEmailVerification(res, firebaseAuth, oobCode as string);
          break;
          default:
            res.status(400).json({ error: 'Invalid Request' });
            break;
        }
 
};
export default verifyEmail;

 
