"use client"
import { IoMdAddCircleOutline } from "react-icons/io";
import { DragDropContext, DropResult, OnDragEndResponder } from "react-beautiful-dnd";
import { useState } from "react";
import { type TaskTypes, type ColumnTypes } from "@/types";
import dynamic from "next/dynamic";
import { Flowbite } from "flowbite-react";
import ColumnModal from "@/components/ColumnModal";
const Column = dynamic(() => import("@/components/Column"), { ssr: false });
import Navbar from "@/components/Navbar";

const initialData = {  
  columnOrder: ["column-1", "column-2", "column-3"],
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Completed",
      taskIds: [],
    },
  },
  tasks: {
    1: { id: 1, title: "Configure Next.js application" },
    2: { id: 2, title: "Configure Next.js and tailwind" },
    3: { id: 3, title: "Create side bar navigation menú" },
    4: { id: 4, title: "Create page footer" },
    5: { id: 5, title: "Create page navigation menú" },
    6: { id: 6, title: "Create page layout" },
    7: { id: 7, title: "new Home layout new" },
  },
}

function Home(): JSX.Element  {

  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleModalColumn = () => setOpenModal(!openModal);

  const reorderColumnList = (sourceCol: ColumnTypes, startIndex: number, endIndex: number): ColumnTypes => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      taskIds: newTaskIds
    }

    return newColumn;
  }

  const handleOnDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    // if user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
      return;
    }

    // if the user drops within the same column but in a different position
    const sourceCol = data.columns[source.droppableId];
    const destionationCol = data.columns[destination.droppableId];

    if (sourceCol.id === destionationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index,
      )

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        }
      }
      setData(newState);
      return;
    }

    // if the moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    }

    const endTaskIds = Array.from(destionationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destionationCol,
      taskIds: endTaskIds
    }

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }
    }

    setData(newData)
  }

  return (
    <Flowbite>
      <Navbar />
      {/* <header className="w-full text-center mt-9">
        <h1 className="bg-clip-text hero-title bg-gradient-to-b from-slate-900 to-slate-900/70 dark:from-white dark:to-white/40 text-transparent border-none">
          Kanban board app
        </h1>
        <h2 className="text-white text-xl">Kanban board</h2>
      </header> */}
      <main className="mx-16 mt-24 flex space-x-4 p-4 rounded-xl">
        <DragDropContext onDragEnd={handleOnDragEnd}>
      
          {data.columnOrder.map((columnId) => {
            const column: ColumnTypes = data.columns[columnId];
            const tasks: TaskTypes[] = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <Column key={columnId} column={column} tasks={tasks}/>
            )
          })}
        </DragDropContext>
        <ColumnModal openModal={openModal} setOpenModal={toggleModalColumn}></ColumnModal>

        <div className="w-full 2xl:w-96 h-min-lg bg-slate-700 rounded-xl">
          <div className="flex justify-center items-center h-full hover:opacity-70 cursor-pointer">
            <IoMdAddCircleOutline className="text-6xl text-white" onClick={toggleModalColumn}/>
          </div>
        </div>
      </main>
    </Flowbite>
  );
}

export default Home;
