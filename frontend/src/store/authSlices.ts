import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  fetchLogin,
  fetchLogout,
  fetchRegistration,
} from "./actions";
import { IUser } from "../models";

interface AuthState {
  isAuthChecked: boolean;
  loading: boolean;
  user: IUser | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthChecked: false,
  loading: false,
  user: null,
  error: null,
};

const handlePending = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, handlePending)
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка входа";
      })

      .addCase(fetchRegistration.pending, handlePending)
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка регистрации";
      })

      .addCase(fetchLogout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })

      .addCase(checkAuth.pending, handlePending)
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.error = action.error.message || "Ошибка проверки";
      });
  },
});

export default authSlice.reducer;
