import mongoose, { Schema, Document } from "mongoose";



export interface ICandidate extends Document {
  id: string;
  name: string;
  image: string;
  votes: number;
}



const candidateSchema: Schema<ICandidate> = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const Candidate = mongoose.model<ICandidate>("Candidate", candidateSchema);

export default Candidate;
