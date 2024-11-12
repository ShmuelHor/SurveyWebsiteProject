import Candidate, { ICandidate } from "../models/CandidateModel";
import User, { IUser } from "../models/UserModel";

export async function IfUserExists(username: any): Promise<{userExists: boolean, user: IUser | null}> {
        const users: IUser[] = await User.find();
        const userFind: IUser | undefined = users.find((u) => u.username === username);
    if (userFind) {
        return {userExists: true, user: userFind};
    } else {
        return {userExists: false, user: null};
    }
}

export async function getUSerById(idUser:string): Promise<IUser | null> {
    const users: IUser[] = await User.find();
    const userFind: IUser | undefined = users.find((u) => u.id === idUser);
    if (userFind) {
        return userFind;
    } else {
        return null;
    }
    
}

export async function getAllUsers(): Promise<IUser[]> {
    const users: IUser[] = await User.find();
    return users;
}

export async function getCandidateById(idCandidate: string): Promise<ICandidate | null> {
    const candidate: ICandidate[] = await Candidate.find();
    const candidateFind: ICandidate | undefined = candidate.find((c) => c.id === idCandidate);
    if (candidateFind) {
        return candidateFind;
    } else {
        return null;
    }
}