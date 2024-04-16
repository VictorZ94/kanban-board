"use client"
import { IoMdAddCircleOutline } from "react-icons/io";
import { DragDropContext, Draggable, DropResult, Droppable, OnDragEndResponder } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { type TaskTypes, type ColumnTypes } from "@/types";
import dynamic from "next/dynamic";
import ColumnModal from "@/components/ColumnModal";
const Column = dynamic(() => import("@/components/Column"), { ssr: false });
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";

function Home(): JSX.Element  {
  const { state:datanew } = useAppContext();
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: session } = useSession();

  const toggleModalColumn = () => setOpenModal(!openModal);

  const reorderColumnList = (sourceCol: ColumnTypes, startIndex: number, endIndex: number): ColumnTypes => {
    const newTaskIds = Array.from(sourceCol.tasks);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      tasks: newTaskIds
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
    const sourceCol = data.columns[Number(source.droppableId)];
    const destionationCol = data.columns[Number(destination.droppableId)];

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
    const startTaskIds = Array.from(sourceCol.tasks);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      tasks: startTaskIds,
    }

    const endTaskIds = Array.from(destionationCol.tasks);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destionationCol,
      tasks: endTaskIds
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

  console.log("data form me", data);

  useEffect(() => {
    if (datanew) {
      setData(datanew)
    }
  }, [datanew])

  return (
    <>
      <Navbar name={session?.user?.name} />
      <main className="mx-16 mt-24 flex space-x-4 p-4 rounded-xl">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {datanew && data.columnsOrder?.map((columnId) => {
            const column: ColumnTypes = data.columns[columnId];
            const tasks: TaskTypes[] = column?.tasks.map((taskId) => data.tasks[taskId]);
            return (
              <Column key={columnId} column={column} tasks={tasks}/>
            )
          })}
        </DragDropContext>
        <ColumnModal
          openModal={openModal}
          setOpenModal={toggleModalColumn}
          userId={session?.user.userId}
        />

        <div className="w-full 2xl:w-96 h-min-lg bg-slate-700 rounded-xl">
          <div
            className="flex justify-center items-center h-full h-min-lg hover:opacity-70 cursor-pointer"
            onClick={toggleModalColumn}
          >
            <IoMdAddCircleOutline className="text-6xl text-white"/>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
