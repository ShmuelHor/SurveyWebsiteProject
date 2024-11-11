// types/index.ts
export interface UsersState {
  user: UserData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  users: User[];
}

export interface User {
  id?: string;
  username: string;
  password: string;
  isAdmin?: boolean;
  hasVoted?: boolean;
  votedFor?: null;
}
export interface UserData {
  message: string;
  success: boolean;
  data?: User | null;
  token?:string;
}

export interface CandidatesState {
  candidates: CandidatesData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface Candidates {
  id?: string;
  name: string;
  image: string;
  votes: number;
}
export interface CandidatesData {
  message: string;
  data?: Candidates[];
  success: boolean;
}

export interface RootState {
  users: UsersState;
  candidates: CandidatesState;
}
