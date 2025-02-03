export interface Task {
  title: string;
  description: string;
  status: "completed" | "inProgress" | "unfinished" | "waitingForApproval";
  isImportant: boolean;
  order: number;
}
