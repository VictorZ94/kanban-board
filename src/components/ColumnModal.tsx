import { CreateColumn } from "@/utils/queries";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { FC, useState } from "react";

interface Props {
  openModal: boolean
  setOpenModal: (_: boolean) => void
  userId: number
}

const ColumnModal: FC<Props> = ({ openModal, setOpenModal, userId }) => {
  const [columnName, setColumnName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const columnCreated = await CreateColumn(columnName, userId);
    console.log("columnCreated", columnCreated);
    setOpenModal(!openModal)
  }

  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(!openModal)} className="dark:bg-slate-900">
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create column</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Column name" />
            </div>
            <TextInput
              id="email"
              placeholder="In progress"
              required
              onChange={({ target }) => setColumnName(target.value)}
            />
          </div>
          <div className="w-full">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ColumnModal;
