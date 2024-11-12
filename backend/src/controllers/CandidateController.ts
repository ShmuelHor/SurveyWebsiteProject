import e, { Request, Response ,NextFunction} from 'express';
import { ICandidate } from '../models/CandidateModel';
import { getAllCandidates } from '../services/CandidateService';

export const getCandidatesHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const Candidates: ICandidate[] = await getAllCandidates();
        res.status(200).json({ data: Candidates, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}

