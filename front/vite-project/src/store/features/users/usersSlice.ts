import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState, User, RootState, UserData } from "../../../types/index";

// הגדרת טיפוס למצב ההתחלתי
const initialState: UsersState = {
  user: null,
  status: "idle",
  error: null,
};

// פעולה א-סינכרונית עבור רישום משתמש
export const registerUser = createAsyncThunk<UserData, User, { rejectValue: string }>(
  "users/register",
  async (newUser: User, thunkAPI) => {
    try {
      const { username, password } = newUser;
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        return thunkAPI.rejectWithValue(data.message || "Failed to create user");
      }

      const data: UserData = await response.json(); // מחזיר את אובייקט המשתמש
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

// פעולה א-סינכרונית עבור כניסת משתמש
export const loginUser = createAsyncThunk<UserData, User, { rejectValue: string }>(
  "users/login",
  async (newUser: User, thunkAPI) => {
    try {
      const { username, password } = newUser;
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        return thunkAPI.rejectWithValue(data.message || "Failed to log in");
      }

      const data: UserData = await response.json(); // מחזיר את אובייקט המשתמש
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

// הסלייס של המשתמשים
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // שמירת כל אובייקט המשתמש
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // שמירת כל אובייקט המשתמש
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      });
  },
});

// סלקטור להחזרת המידע על המשתמש או השגיאה
export const selectUser = (state: RootState): UserData | null => {
  return state.users.user; // מחזיר את המשתמש או את השגיאה
};

export default usersSlice.reducer;
