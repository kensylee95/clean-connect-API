
import session from 'express-session';
import UserModel from '../models/userModel';
import { User } from 'firebase/auth';

declare module 'express-session' {
  interface SessionData {
    user: UserModel|null
  }
}