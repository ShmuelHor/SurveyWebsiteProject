import { createUser,login,getAllCandidates} from '../services/Servise';
import { Request, Response ,NextFunction} from 'express';
// import jwt from 'jsonwebtoken';
import { IUser } from '../models/UserModel';
import { ICandidate } from '../models/CandidateModel';
// import { JWT_SECRET } from '../config';


export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required', success: false });
        return;
      }
      const user: IUser = await createUser(username, password);
      if (!user) {
        res.status(400).json({ message: 'User existing ', success: false });
        return;
      }
      res.status(201).json({ message: 'User created successfully',user: user, success: true });
  
    } catch (error: any) {
      res.status(400).json({ message: error.message, success: false });
    }
  };

  export const loginHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body;
        
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required', success: false });
            return;
        }
        const user: IUser = await login(username, password);
        if (!user) {
            res.status(400).json({ message: 'User not found', success: false });
            return;
        }
        res.status(200).json({ message: 'Login successful', user: user, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}

export const getCandidatesHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const Candidates: ICandidate[] = await getAllCandidates();
        if (!Candidates) {
            res.status(400).json({ message: 'Candidates not found', success: false });
            return;
        }
        res.status(200).json({ data: Candidates, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}
