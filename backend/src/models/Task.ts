import mongoose, { Schema, Types } from "mongoose";

export interface ITask extends Document{
  _id: Types.ObjectId;
  title: string;
  description?: string;
  status: 'completed' | "inProgress" | "unfinished" | "waitingForApproval";
  isImportant: boolean;
  subtasks: Types.ObjectId | null;
  owner: Types.ObjectId;
}

const subtaskValidator = async (taskId: Types.ObjectId) =>{
  if(!taskId){
    return true;
  }
  const task = await TaskModel.findById(taskId);
  return !(task && task.subtasks);
}

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
    subtasks: { type: Types.ObjectId, ref: "Task", 
      validate:{validator: subtaskValidator, message: 'Подзадача не может иметь вложенные подзадачи'}, default: null },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
  },
  { timestamps: true }
);


export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
