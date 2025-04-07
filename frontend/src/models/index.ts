export type StatusType =
  | "completed"
  | "inProgress"
  | "unfinished"
  | "waitingForApproval";

export interface ITask {
  _id: string;
  title: string;
  common: boolean;
  description: string;
  status: StatusType;
  isImportant: boolean;
  order: number;
  // subtasks?: ITask;
  owner?: string;
}

export enum GenderEnum {
  female = "Женский",
  male = "Мужской",
}

export enum LanguageEnum {
  russian = "Русский",
  english = "Английский",
}

export type ITaskRequest = Partial<ITask>;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  fullName?: string;
  gender?: GenderEnum;
  language?: LanguageEnum;
  country?: string;
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

export interface TasksRespose {
  message: string;
  tasks: ITask[];
}

export interface TaskRespose {
  message: string;
  task: ITask;
}

export type ResposeWithMessage = {
  message: string;
};
