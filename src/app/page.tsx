"use client"
import { IoMdAddCircleOutline } from "react-icons/io";
import { DragDropContext, DropResult, OnDragEndResponder } from "react-beautiful-dnd";
import { useState } from "react";
import { type TaskTypes, type ColumnTypes } from "@/types";
import dynamic from "next/dynamic";
const Column = dynamic(() => import("@/components/Column"), { ssr: false });

const initialData = {
  tasks: {
    1: { id: 1, title: "Configure Next.js application" },
    2: { id: 2, title: "Configure Next.js and tailwind" },
    3: { id: 3, title: "Create side bar navigation menú" },
    4: { id: 4, title: "Create page footer" },
    5: { id: 5, title: "Create page navigation menú" },
    6: { id: 6, title: "Create page layout" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: [1,2,3,4,5,6]
    },
    "column-2": {
      id: "column-2",
      title: "Progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Completed",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
}

function Home(): JSX.Element  {
  const [data, setData] = useState(initialData);

  const handleOnDragEnd: OnDragEndResponder  = (result: DropResult): void => {
    const { source, destination } = result;

  }

  return (
    <>
      <header className="w-full text-center mt-9">
        <h1 className="bg-clip-text hero-title bg-gradient-to-b from-slate-900 to-slate-900/70 dark:from-white dark:to-white/40 text-transparent border-none">
          Task management app
        </h1>
        <h2 className="text-white text-xl">Kanban board</h2>
      </header>
      <main className="mx-16 mt-5 flex space-x-4 p-4 border border-solid rounded-xl">
        <DragDropContext onDragEnd={handleOnDragEnd}>
      
          {data.columnOrder.map((columnId) => {
            const column: ColumnTypes = data.columns[columnId];
            const tasks: TaskTypes[] = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <Column key={columnId} column={column} tasks={tasks}/>
            )
          })}
          
        </DragDropContext>

        <div className="w-full 2xl:w-96 h-min-lg bg-slate-700 rounded-xl">
          <div className="flex justify-center items-center h-full hover:opacity-70 cursor-pointer">
            <IoMdAddCircleOutline className="text-6xl text-white"/>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;


