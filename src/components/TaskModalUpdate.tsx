import { useAppContext } from "@/context";
import { TaskTypes } from "@/types";
import { CreateTask, UpdateTask } from "@/utils/queries";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import React, { FC, useEffect, useState } from "react";

interface Props {
  openModal: boolean
  setOpenModal: (_: boolean) => void
  dataToUpdate: TaskTypes
}

const TaskModalUpdate: FC<Props> = ({ openModal, setOpenModal, dataToUpdate }) => {
  const [dataTask, setDataTask] = useState({});
  const { state: data, fetchInitialData } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataTask({
      ...dataTask,
      [e.target.name]: e.target.value
    })
  }

  const { title, description } = dataTask;

  useEffect(() => {
    setDataTask(dataToUpdate);
  }, [dataToUpdate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await UpdateTask(dataTask);
    setOpenModal(!openModal)
    fetchInitialData();
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
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">{"Update"} task</h3>
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
              value={title}
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
              value={description}
            />
          </div>
          <div className="w-full">
            <Button type="submit">Update task</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default TaskModalUpdate;
