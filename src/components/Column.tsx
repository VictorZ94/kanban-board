import { type ColumnTypes, type TaskTypes } from "@/types";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdAddCircleOutline } from "react-icons/io";
import TaskModal from "./TaskModal";

interface Props {
  column: ColumnTypes
  tasks: TaskTypes[]
}

const Column: React.FC<Props> = ({ column, tasks }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toggleModalColumn = () => setOpenModal(!openModal);


  return (
    <div className="w-full 2xl:w-96 h-min-lg bg-slate-700 rounded-xl">
      <div className="p-4 text-white font-semibold flex justify-between">
        {column.title}
        <span className="cursor-pointer">
          <IoMdAddCircleOutline className="text-lg text-white" onClick={toggleModalColumn}/>
        </span>
      </div>
      <div className="flex flex-col justify-between min-h-72 h-full">
        <Droppable droppableId={`column-${column.id}`}>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="px-2 space-y-2 h-64"
            >
              {tasks && tasks.map((task: TaskTypes, index) => (
                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.dragHandleProps}
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      className="bg-white font-semibold p-2 rounded-md"
                    >
                      {task.title}
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
        {/* <div className="bg-gray-500 text-white font-bold text-center py-2 cursor-pointer rounded-md mt-2">
          + add another card
        </div> */}
        <TaskModal
          openModal={openModal}
          setOpenModal={toggleModalColumn}
          columnId={Number(column.id)}        />
      </div>
    </div>
  )
}

export default Column;
