import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './features/users/usersSlice';
import candidatesReducer from './features/candidates/candidatesSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        candidates:candidatesReducer
    }
});

// הוספת טיפוסים לstore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;