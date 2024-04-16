import { useAppContext } from "@/context";
import { TaskTypes } from "@/types";
import { CreateTask } from "@/utils/queries";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import React, { FC, useState } from "react";

interface Props {
  openModal: boolean
  setOpenModal: (_: boolean) => void
  columnId: number
}

const TaskModal: FC<Props> = ({ openModal, setOpenModal, columnId }) => {
  const [dataTask, setDataTask] = useState({});
  const { state: data, setState } = useAppContext();

  const handleChange = (e) => {
    setDataTask({
      ...dataTask,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = await CreateTask(columnId, dataTask);
    // console.log("task created", newTask);
    setOpenModal(!openModal)
    // if (!newTask) return
    const { tasks } = data;
    // console.log("tasks from context", tasks);
    let allTask = {...tasks, [newTask.id]: newTask}
    // console.log(allTask);
    setState({
      ...data,
      tasks: allTask
    })
  }

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      onClose={() => {
        setOpenModal(!openModal);
      }}
      className="dark:bg-slate-900"
    >
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">{"Create"} task</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Task title" />
            </div>
            <TextInput
              id="title"
              placeholder="Go to the mountains 🌄"
              name="title"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="Leave a description..."
              required rows={4}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Button type="submit">Create task</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default TaskModal;
