import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../models";
import { fetchGetUserTasks } from "./actions";

interface TodoState {
  tasks: ITask[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  tasks: null,
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUserTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchGetUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка получения задач";
      });
  },
});

export default todoSlice.reducer;
