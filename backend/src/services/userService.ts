import User, { IUser } from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {getCandidateById, getUSerById, IfUserExists} from "../utils/utils";
import { ICandidate } from "../models/CandidateModel";

dotenv.config();

const Jwt_Secret = process.env.JWT_SECRET;

export const createUser = async (username: string, password: string) => {
  try {
    if(!username || !password){
      throw new Error('Username and password are required');
    }
    const user = await IfUserExists(username);
    if(user.userExists){
      throw new Error('User existing ');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id: uuidv4(),
      username,
      password: hashedPassword,
      isAdmin: false,
      hasVoted: false,
      votedFor: null,
    });
    const userCreated = await newUser.save();
    return userCreated;
  } catch (err) {
    throw err;
  }
};

export const login = async (username: string, password: string) => {
  try {
    if(!username || !password){
      throw new Error('Username and password are required');
    }
    const userFind = await IfUserExists(username);
    if (!userFind.userExists) {
      throw new Error("One of the details is wrong");
    }
    const isPasswordValid = await bcrypt.compare(password, userFind.user!.password);
    if (!isPasswordValid) {
      throw new Error("One of the details is wrong");
    }
    const token = jwt.sign(
      { userId: userFind.user!.id },
      Jwt_Secret as string,
      { expiresIn: "1h" }
    );

    return {token:token, user: userFind.user};
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const user: IUser[] = await User.find();
    if (!user) {
      throw new Error("No users found");
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const updateUserVoteStatus = async (idUser: string, idCandidate: string) => {
    try {
      const user: IUser | null = await getUSerById(idUser);
      if (!user) {
        throw new Error("User not found");
      }
  
      const candidate: ICandidate | null = await getCandidateById(idCandidate);
      if (!candidate) {
        throw new Error("Candidate not found");
      }
  
      user.hasVoted = true;
      user.votedFor = candidate;
  
      const updatedUser = await user.save();
      const Users = await getAllUsers();
      return Users;
    } catch (err) {
      throw err;
    }
  };
  