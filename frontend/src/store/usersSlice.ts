import { createSlice } from "@reduxjs/toolkit";
import { fetchGetAllUsers } from "./actions";
import { IUser } from "../models";

interface UsersState{
  users: IUser[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: null,
  loading: false, 
  error: null,
}


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}, 
  extraReducers: (builder) =>{
    builder
    .addCase(fetchGetAllUsers.pending, (state) =>{
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchGetAllUsers.fulfilled, (state, action) =>{
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    })
    .addCase(fetchGetAllUsers.rejected, (state, action) =>{
      state.loading = false;
      state.error = action.error.message || 'Возникла неизвестная ошибка при получении пользователей';
    })
  }
});

export default usersSlice.reducer;