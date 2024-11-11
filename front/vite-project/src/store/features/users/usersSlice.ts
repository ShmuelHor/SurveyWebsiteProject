import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState, User, RootState, UserData } from "../../../types";

const initialState: UsersState = {
  user: null,
  status: "idle",
  error: null,
  users: [],
};

export const fetchRegisterUser = createAsyncThunk<
  UserData,
  User,
  { rejectValue: string }
>("users/fetchRegister", async (newUser, thunkAPI) => {
  try {
    const { username, password } = newUser;
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data: UserData = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const fetchLoginUser = createAsyncThunk<
  UserData,
  User,
  { rejectValue: string }
>("users/fetchLogin", async (newUser, thunkAPI) => {
  try {
    const { username, password } = newUser;
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data: UserData = await response.json();
    if (!response.ok || !data.token || !data.data) {
      throw new Error(data.message);
    }

    localStorage.setItem("Token", data.token.toString());
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("Token");
    const response = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const data: User[] = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
})


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    LogOut: (state) => {
      localStorage.removeItem("Token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "";
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.error = action.payload || "";
        state.status = "failed";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload || "";
        state.status = "failed";
      });
  },
});

export const selectUser = (state: RootState) => state.users;

export const { LogOut } = usersSlice.actions;

export default usersSlice.reducer;
