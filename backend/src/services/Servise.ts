import User, { IUser } from '../models/UserModel';
import Candidate, { ICandidate } from '../models/CandidateModel';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const createUser = async (username: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id: uuidv4(),
      username,
      password: hashedPassword,
      isAdmin: false,
      hasVoted: false,
      votedFor: null,
    });
    const user =await newUser.save();
    return user;
  } catch (err) {
    throw err;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const users: IUser[] = await User.find();
    const user = users.find((u) => u.username === username);
    if (!user) {
      throw new Error('Identification error');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Identification error');
    }
    return user;
  } catch (err) {
    throw err;
  }
}

export const getAllCandidates = async () => {
  try {
    const candidate: ICandidate[] = await Candidate.find();
    return candidate;
  } catch (err) {
    throw err;
  }
}