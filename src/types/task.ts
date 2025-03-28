// src/types/task.ts
/**
 * Type definitions for tasks
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  owner: {
    id: string;
    name: string;
    profilePic: string;
  };
  topic: string;
  subject: string;
  dateCreated: string;
  deadline: string;
  budget: number;
  status: string;
}

export type TaskStatus = "to do" | "in progress" | "completed";
