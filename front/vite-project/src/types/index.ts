// types/index.ts

export interface UsersState {
  user: UserData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface User {
  username: string;
  password: string;
}
export interface UserData {
  message: string;
  success: boolean;
  user?: {
    id: string;
    username: string;
    password: string;
    isAdmin: boolean;
    hasVoted: boolean;
    votedFor: null;
  };
}

export interface RootState {
  users: UsersState;
}
