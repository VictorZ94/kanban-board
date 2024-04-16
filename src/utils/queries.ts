import { TaskTypes } from "@/types";
import { arrayToObject, arrayToObjectTask } from "@/utils/utils";
import axios from "axios";

export async function getColumnsByUserId(userId: number) {
  try {
    const columns = await axios.get(
      `http://localhost:3000/api/columns/${userId}`
    );
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
    const newColumn = await axios.post(
      `http://localhost:3000/api/columns/${userId}`,
      {
        title: columnName,
      }
    );
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
    const tasks = await axios.get(`http://localhost:3000/api/tasks`);
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
    const newColumn = await axios.post(
      `http://localhost:3000/api/tasks/${columnId}`,
      data
    );
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
    const taskUpdated = await axios.put(
      `http://localhost:3000/api/tasks/${data.id}`,
      data
    );
    if (taskUpdated.status === 200) {
      return taskUpdated.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}

export async function RemoveTask(taskId: number) {
  try {
    const newColumn = await axios.delete(
      `http://localhost:3000/api/tasks/${taskId}`
    );
    if (newColumn.status === 200) {
      return newColumn.data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}
