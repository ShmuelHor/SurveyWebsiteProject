import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CandidatesState, RootState, CandidatesData } from "../../../types";

const aaa: CandidatesData = {
  data: [],
  message: " ",
  success: false,
};

const initialState: CandidatesState = {
  candidates: aaa,
  status: "idle",
  error: null,
};

export const fetchCandidates = createAsyncThunk<
  CandidatesData,
  void,
  { rejectValue: string }
>("candidates/fetchCandidates", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("Token");

    const response = await fetch("http://localhost:3000/api/candidates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const data: CandidatesData = await response.json();
      throw new Error(data.message);
    }

    const data: CandidatesData = await response.json();
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.error = action.payload || "";
        state.status = "failed";
      });
  },
});
export const selectCandidates = (state: RootState) => {
  return state.candidates;
};

export default candidatesSlice.reducer;
