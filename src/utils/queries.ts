import { ColumnTypes, TaskTypes } from "@/types";
import { arrayToObject, arrayToObjectTask } from "@/utils/utils";
import axios from "axios";

export async function getColumnsByUserId(userId: number) {
  try {
    const columns = await axios.get(`/api/columns/${userId}`);
    if (columns.status === 200 && columns.data.length > 0) {
      const columnsData = arrayToObject(columns.data);
      return columnsData;
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
}

export async function CreateColumn(columnName: string, userId: number) {
  try {
    const newColumn = await axios.post(`/api/columns/${userId}`, {
      title: columnName,
    });
    if (newColumn.status === 200) {
      return newColumn.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}

interface InfoColumn {
  title: string;
  description: string;
}

export async function getTasks() {
  try {
    const tasks = await axios.get("/api/tasks");
    // console.log("from quesris", tasks);
    if (tasks.status === 200 && tasks.data.length > 0) {
      const tasksData = arrayToObjectTask(tasks.data);
      // console.log("tasksData", tasksData);
      return tasksData;
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
}

export async function CreateTask(columnId: number, data: InfoColumn) {
  try {
    const newColumn = await axios.post(`/api/tasks/${columnId}`, data);
    if (newColumn.status === 200) {
      return newColumn.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateTask(data: TaskTypes) {
  try {
    const taskUpdated = await axios.put(`/api/tasks/${data.id}`, data);
    if (taskUpdated.status === 200) {
      return taskUpdated.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateColumn(columnId: number, title: string) {
  try {
    const columnUpdated = await axios.put(`/api/columns/${columnId}`, {
      title,
    });
    if (columnUpdated.status === 200) {
      return columnUpdated.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}

export async function RemoveTask(taskId: number) {
  try {
    const newColumn = await axios.delete(`/api/tasks/${taskId}`);
    if (newColumn.status === 200) {
      return newColumn.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}

export async function removeColumn(columnId: number) {
  try {
    const newColumn = await axios.delete(`/api/columns/${columnId}`);
    if (newColumn.status === 200) {
      return newColumn.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}
