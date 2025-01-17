interface ITask{
  title: string;
  description: string;
  status: "completed" | "inProgress" | "unfinished" | "waitingForApproval";
  isImportant: boolean;
  subtasks: ITask;
  owner: IUser;
}

export interface IUser{
  id: string;
  name: string;
  email: string;
  tasks: ITask[];

}

export interface AuthResponse{
  message: string;
  accessToken: string;
  user: IUser;
}

export interface UsersResponse{
  message: string;
  users: IUser[];
}

