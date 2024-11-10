import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer
    }
});

// הוספת טיפוסים לstore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;