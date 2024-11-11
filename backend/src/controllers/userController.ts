import { createUser,login,getAllCandidates,getAllUsers} from '../services/userService';
import e, { Request, Response ,NextFunction} from 'express';
import { IUser } from '../models/UserModel';
import { ICandidate } from '../models/CandidateModel';


export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const user: IUser = await createUser(username, password);
      res.status(201).json({ message: 'User created successfully',data: user, success: true });
  
    } catch (error: any) {
      res.status(400).json({ message: error.message, success: false });
    }
  };

  export const loginHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body;
        

        const data = await login(username, password);
        const {token, user} = data;
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENVIORMENT === 'production',
            maxAge: 3600000, 
            sameSite: 'none',
          });
        res.status(200).json({ message: 'Login successful',data: user, token: token, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}

export const getCandidatesHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const Candidates: ICandidate[] = await getAllCandidates();
        res.status(200).json({ data: Candidates, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}
export const getAllUsersHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}
