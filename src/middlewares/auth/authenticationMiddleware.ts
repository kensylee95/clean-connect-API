import { Request, Response, NextFunction } from 'express';

//Authentication middleware to ensure user is authenticated
function isAuthenticated(req:Request, res:Response, next:NextFunction){
    if (req.session&&req.session.user){
      //User is authenticated
      return next();
    }
    //user is not authenticated 
    return res.sendStatus(401);
  }
export default isAuthenticated;