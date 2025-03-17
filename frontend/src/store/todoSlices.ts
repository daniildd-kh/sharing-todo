import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../models";
import {
  fetchAddUserTask,
  fetchGetCommonTasks,
  fetchGetUserTasks,
  fetchRemoveUserTask,
  fetchUpdateUserTask,
} from "./actions";

interface TodoState {
  tasks: ITask[] | null;
  commonTasks: ITask[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  tasks: null,
  commonTasks: null,
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasks(state, action: PayloadAction<ITask[]>) {
      state.commonTasks = action.payload;
    },
  },
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
      .addCase(fetchGetCommonTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetCommonTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.commonTasks = action.payload;
      })
      .addCase(fetchGetCommonTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка получения задач";
      })
      .addCase(fetchUpdateUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUpdateUserTask.fulfilled,
        (state, action: PayloadAction<ITask>) => {
          state.loading = false;
          const isCommonTask = action.payload.common;

          if (isCommonTask) {
            const taskIndex = state.commonTasks?.findIndex(
              (task) => task._id === action.payload._id
            );
            if (
              taskIndex !== undefined &&
              taskIndex !== -1 &&
              state.commonTasks
            ) {
              state.commonTasks[taskIndex] = action.payload;
            }
          } else {
            const taskIndex = state.tasks?.findIndex(
              (task) => task._id === action.payload._id
            );
            if (taskIndex !== undefined && taskIndex !== -1 && state.tasks) {
              state.tasks[taskIndex] = action.payload;
            }
          }
        }
      )

      .addCase(fetchUpdateUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при обновлении задачи";
      })
      .addCase(fetchRemoveUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRemoveUserTask.fulfilled,
        (state, action: PayloadAction<ITask>) => {
          state.loading = false;
          const removedTask = action.payload;
          const isCommonTask = removedTask.common;

          if (isCommonTask) {
            state.commonTasks =
              state.commonTasks?.filter(
                (task) => task._id !== removedTask._id
              ) || [];
          } else {
            state.tasks =
              state.tasks?.filter((task) => task._id !== removedTask._id) || [];
          }
        }
      )
      .addCase(fetchRemoveUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при удалении задачи";
      })
      .addCase(fetchAddUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAddUserTask.fulfilled,
        (state, action: PayloadAction<ITask>) => {
          state.loading = false;
          const isCommonTask = action.payload.common;
          if (isCommonTask) {
            if (state.commonTasks) {
              state.commonTasks.push(action.payload);
            } else {
              state.commonTasks = [action.payload];
            }
          } else {
            if (state.tasks) {
              state.tasks.push(action.payload);
            } else {
              state.tasks = [action.payload];
            }
          }
        }
      )
      .addCase(fetchAddUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при создании задачи";
      });
  },
});

export const { updateTasks } = todoSlice.actions;
export default todoSlice.reducer;
