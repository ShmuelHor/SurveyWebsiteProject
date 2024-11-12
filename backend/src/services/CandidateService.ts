import Candidate, { ICandidate } from "../models/CandidateModel";
import { getCandidateById } from "../utils/utils";

export const getAllCandidates = async () => {
    try {
      const candidate: ICandidate[] = await Candidate.find();
      if (!candidate) {
        throw new Error("No candidates found");
      }
      return candidate;
    } catch (err) {
      throw err;
    }
  };

export const AddVote = async (idCandidate: string) => {
    try {
      const candidate: ICandidate | null = await getCandidateById(idCandidate);
      if (!candidate) {
        throw new Error("Candidate not found");
      }
      candidate.votes += 1;
      await candidate.save();
      const Candidates: ICandidate[] = await getAllCandidates();
      return Candidates;
    } catch (err) {
      throw err;
    }
  };