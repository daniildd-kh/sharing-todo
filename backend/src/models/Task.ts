import mongoose, { Schema, Types, Document } from "mongoose";
import { UserModel } from "./User";

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  status: "completed" | "inProgress" | "unfinished" | "waitingForApproval";
  isImportant: boolean;
  order: number;
  subtasks: Types.ObjectId | null;
  owner: Types.ObjectId;
}

const subtaskValidator = async function (taskId: Types.ObjectId) {
  if (!taskId) {
    return true;
  }
  const Task = mongoose.model<ITask>("Task");
  const task = await Task.findById(taskId);
  return !(task && task.subtasks);
};

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["completed", "inProgress", "unfinished", "waitingForApproval"],
      default: "unfinished",
    },
    isImportant: { type: Boolean, default: false },
    order: { type: Number, required: true },
    subtasks: {
      type: Types.ObjectId,
      ref: "Task",
      validate: {
        validator: subtaskValidator,
        message: "Подзадача не может иметь вложенные подзадачи",
      },
      default: null,
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

TaskSchema.post("save", async function updateUserTasks() {
  const user = await UserModel.findById(this.owner);
  await user?.tasks.push(this._id);
  await user?.save();
});

TaskSchema.post("findOneAndDelete", async function removeUserTask(task) {
  await UserModel.findByIdAndUpdate(task.owner, { $pull: { tasks: task._id } });
});

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
