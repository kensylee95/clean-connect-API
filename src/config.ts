import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Extract environment variables
const {
  API_KEY,
  AUTH_DOMAIN,
  Project_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDERID,
  APPID,
  PORT,
  ROOTURL,
  APPSECRETKEY,
} = process.env;

// Define the application's configuration
export const applicationPort: number|null|undefined = Number(PORT);
export const applicationRootUrl: string = ROOTURL|| "localhost:3000";
export const AppSecretKey:string = APPSECRETKEY||"";
export const firebaseConfig: FirebaseConfig = {
  apiKey: API_KEY || '',
  authDomain: AUTH_DOMAIN || '',
  projectId: Project_ID || '',
  storageBucket: STORAGE_BUCKET || '',
  messagingSenderId: MESSAGE_SENDERID || '',
  appId: APPID || '',
};
