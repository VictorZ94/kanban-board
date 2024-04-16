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
