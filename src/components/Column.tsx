import { type ColumnTypes, type TaskTypes } from "@/types";
import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdAddCircleOutline } from "react-icons/io";
import TaskModal from "./TaskModal";
import { Dropdown } from "flowbite-react";
import { useAppContext } from "@/context";
import { RemoveTask, removeColumn } from "@/utils/queries";
import TaskModalUpdate from "./TaskModalUpdate";
import { FaEdit } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import ColumnModalUpdate from "./ColumnModalUpdate";

interface Props {
  column: ColumnTypes
  tasks: TaskTypes[]
}

const Column: React.FC<Props> = ({ column, tasks }) => {
  const { state: data, fetchInitialData } = useAppContext();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [openModalUpdateColumn, setOpenModalUpdateColumn] = useState<boolean>(false);
  const [dataToUpdate, setDataToUpdate] = useState({});
  const [dataToUpdateColumn, setDataToUpdateColumn] = useState({});
  const toggleModalTask = () => setOpenModal(!openModal);
  const toggleModalUpdateTask = () => setOpenModalUpdate(!openModalUpdate);
  const toggleModalUpdateColumn = () => setOpenModalUpdateColumn(!openModalUpdateColumn);

  const HandleRemoveTask = async (id: number) => {
    const taskRemoved = await RemoveTask(id);
    fetchInitialData();
  };

  const HandleRemoveColumn = async (id: number) => {
    const columnRemoved = await removeColumn(id);
    fetchInitialData();
  };

  const handleUpdate = (tasks) => {
    setDataToUpdate(tasks);
    toggleModalUpdateTask();
  }

  const handleUpdateColumn = (columnInfo: ColumnTypes) => {
    setDataToUpdateColumn(columnInfo)
    toggleModalUpdateColumn();
  }

  return (
    <div className="w-full h-[calc(100vh-10rem)] 2xl:w-96 bg-slate-700 rounded-xl">
      <div className="p-4 text-white font-semibold flex justify-between">
        {column.title}
        <span className="cursor-pointer flex space-x-2">
          <IoMdAddCircleOutline className="text-lg text-white" onClick={toggleModalTask} />
          <FaEdit onClick={() => handleUpdateColumn(column)} />
          <IoMdRemoveCircleOutline onClick={() => HandleRemoveColumn(Number(column.id))} />
        </span>
      </div>
      <div className="flex flex-col justify-between min-h-72 h-full">
        <Droppable droppableId={`${column.id}`}>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="px-2 space-y-2 h-64"
            >
              {tasks && tasks.map((task: TaskTypes, index) => (
                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                  {(draggableProvided) => (
                    <div
                      {...draggableProvided.dragHandleProps}
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      className="bg-white font-semibold p-2 rounded-md text-md flex justify-between"
                    >
                      <li className="flex flex-col">
                        {task.title}
                        <span className="text-sm font-light">{task.description}</span>
                      </li>
                      <Dropdown label="" placement="right">
                        <Dropdown.Item onClick={() => HandleRemoveTask(task.id)}>Remove</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleUpdate(task)}>Update</Dropdown.Item>
                      </Dropdown>
                    </div>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
        <TaskModal
          openModal={openModal}
          setOpenModal={toggleModalTask}
          columnId={Number(column.id)}
        />
        <TaskModalUpdate
          openModal={openModalUpdate}
          setOpenModal={toggleModalUpdateTask}
          dataToUpdate={dataToUpdate}
        />
        <ColumnModalUpdate
          openModal={openModalUpdateColumn}
          setOpenModal={toggleModalUpdateColumn}
          dataToUpdate={dataToUpdateColumn}
        />
      </div>
    </div>
  )
}

export default Column;
