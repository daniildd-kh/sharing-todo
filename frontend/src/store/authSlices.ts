import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkAuth,
  fetchLogin,
  fetchLogout,
  fetchRegistration,
} from "./actions";
import { IUser } from "../models";

type TStatus = "offline" | "online";

interface AuthState {
  isAuthChecked: boolean;
  loading: boolean;
  user: IUser | null;
  error: string | null;
  status: TStatus;
}

const initialState: AuthState = {
  isAuthChecked: false,
  loading: false,
  user: null,
  error: null,
  status: "offline",
};

const handlePending = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authChecked: (state) => {
      state.user = null;
      state.isAuthChecked = true;
    },
    setStatus: (state, action: PayloadAction<TStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, handlePending)
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchRegistration.pending, handlePending)
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        state.isAuthChecked = true;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
        state.user = null;
        state.error = action.error.message || "Ошибка проверки";
      });
  },
});

export const { authChecked, setStatus } = authSlice.actions;

export default authSlice.reducer;
