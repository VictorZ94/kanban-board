import { arrayToObject } from "@/utils/utils";
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

export async function CreateTask(columnId: number, data: InfoColumn) {
  try {
    const newColumn = await axios.post(
      `http://localhost:3000/api/task/${columnId}`,
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
