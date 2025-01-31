import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../models";
import {
  fetchAddUserTask,
  fetchGetUserTasks,
  fetchRemoveUserTask,
  fetchUpdateUserTask,
} from "./actions";

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
      })
      .addCase(fetchUpdateUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdateUserTask.fulfilled, (state, action) => {
        state.loading = false;
        const taskIndex = state.tasks?.findIndex(
          (task) => task._id === action.payload._id
        );
        if (taskIndex !== -1 && state.tasks && taskIndex !== undefined) {
          state.tasks[taskIndex] = action.payload;
        }
      })
      .addCase(fetchUpdateUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при обновлении задачи";
      })
      .addCase(fetchRemoveUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRemoveUserTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks
          ? state.tasks.filter((task) => task._id !== action.payload)
          : null;
      })
      .addCase(fetchRemoveUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при удалении задачи";
      })
      .addCase(fetchAddUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddUserTask.fulfilled, (state, action) => {
        state.loading = false;
        if (state.tasks) {
          state.tasks.push(action.payload);
        } else {
          state.tasks = [action.payload];
        }
      })
      .addCase(fetchAddUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при создании задачи";
      });
  },
});

export default todoSlice.reducer;
