import { TaskTypes } from "@/types";

interface Column {
  id: number;
  title: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  tasks: number[];
}

export function arrayToObject(array: Column[]): { [id: number]: Column } {
  const result: { [id: number]: Column } = {};
  array.forEach((item) => {
    item.tasks = item.tasks.map((task) => task.id);
    result[item.id] = item;
  });
  return result;
}

interface Column {
  id: number;
  title: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  tasks: number[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

// function to convert array task from objects
export function arrayToObjectTask(array: Task[]): { [id: number]: Task } {
  const result: { [id: number]: Task } = {};
  array.forEach((item) => {
    result[item.id] = item;
  });
  return result;
}
