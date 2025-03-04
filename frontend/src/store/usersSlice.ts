import { createSlice } from "@reduxjs/toolkit";
import { fetchGetAllUsers } from "./actions";
import { IUser } from "../models";

interface UsersState {
  users: IUser[] | null;
  onlineUsers: { email: string; status: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  onlineUsers: [],
  users: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Возникла неизвестная ошибка при получении пользователей";
      });
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
