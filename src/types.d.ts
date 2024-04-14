export interface TaskTypes {
  id: number;
  title: string;
}

// interface Data {
//   columnOrder: string[]
//   tasks: TaskTypes
//   columns: Column
// }

export interface ColumnTypes {
  id: string;
  title: string;
  taskIds: TaskTypes[];
}
