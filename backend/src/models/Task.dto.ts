export interface Task {
  title: string;
  common: boolean;
  description: string;
  status: "completed" | "inProgress" | "unfinished" | "waitingForApproval";
  isImportant: boolean;
  order: number;
}
