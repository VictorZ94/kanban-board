import { type ColumnTypes, type TaskTypes } from "@/types";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface Props {
  column: ColumnTypes
  tasks: TaskTypes[]
}

const Column: React.FC<Props> = ({ column, tasks }) => {
  return (
    <div className="w-full 2xl:w-96 h-min-lg bg-slate-700 rounded-xl">
      <div className="p-4 text-white font-semibold">{column.title}</div>
      <div className="flex flex-col justify-between h-full">
        <Droppable droppableId={column.id}>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="px-2 space-y-2"
            >
              {tasks.map((task: TaskTypes, index) => (
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
      </div>
    </div>
  )
}

export default Column;