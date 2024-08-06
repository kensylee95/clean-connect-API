import { applyActionCode, Auth } from "firebase/auth";
import { loginRedirectUrl } from "../constants/urlLinks";
import { Response } from "express";


export async function handleEmailVerification(response:Response, auth:Auth, oobCode:string): Promise<void> {
  try {
    //url to redirect to front end route with the "verified" as query params
    const url = `${loginRedirectUrl}?verified=true`;
    await applyActionCode(auth, oobCode);
    //redirect to route
    response.redirect(302, url);
  } catch (error) {
    throw response.status(400).json({ error: 'invalid or expired verification code, please request code again' });
  }
}
