import { Request, Response,} from "express";
import getUserByIdRepository from "../../repositories/userRepository/getUserByIdRepository";

// dashboard accessible to only authenticated user
export async function dashboardIndex(req:Request, res:Response){
    try {
       //get email from request body
       const id:string|undefined = req.session.user?.id;
      // Send password reset email
     const user = await getUserByIdRepository(id!)
      //return success response containing fetched user
      res.status(200).json({ message:"request was successful",user:user});
    } catch (error) {
      console.error('Error sending password reset email:', error);
      res.status(500).json({ error: error});
    }
};

