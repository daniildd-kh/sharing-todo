export type StatusType =
  | "completed"
  | "inProgress"
  | "unfinished"
  | "waitingForApproval";

export interface ITask {
  title: string;
  description: string;
  status: StatusType;
  isImportant: boolean;
  subtasks?: ITask;
  owner?: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  tasks: ITask[];
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: IUser;
}

export interface UsersResponse {
  message: string;
  users: IUser[];
}

export interface TaskRespose {
  message: string;
  tasks: ITask[];
}
