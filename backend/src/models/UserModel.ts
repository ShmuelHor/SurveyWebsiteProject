import mongoose, { Schema, Document } from "mongoose";
import { ICandidate } from "./CandidateModel";

export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  votedFor: ICandidate | null;
}

const userSchema: Schema<IUser> = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists"],
  }as object,
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
  votedFor: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
    default: null,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
