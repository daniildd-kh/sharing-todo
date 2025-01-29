import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlices";
import usersReducer from "./usersSlice";
import taskReducer from "./todoSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    todo: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
