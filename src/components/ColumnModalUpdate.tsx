import { useAppContext } from "@/context";
import { ColumnTypes } from "@/types";
import { UpdateColumn } from "@/utils/queries";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { FC, useEffect, useState } from "react";

interface Props {
  openModal: boolean
  setOpenModal: (_: boolean) => void
  dataToUpdate: ColumnTypes
}

const ColumnModalUpdate: FC<Props> = ({ openModal, setOpenModal, dataToUpdate }) => {
  const [columnName, setColumnName] = useState<string>("");
  const { state: data, fetchInitialData } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await UpdateColumn(Number(dataToUpdate.id), columnName);
    setOpenModal(!openModal)
    fetchInitialData()
  }

  useEffect(() => {
    setColumnName(dataToUpdate.title);
  }, [dataToUpdate])

  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(!openModal)} className="dark:bg-slate-900">
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update column</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Column name" />
            </div>
            <TextInput
              id="email"
              placeholder="In progress"
              required
              onChange={({ target }) => setColumnName(target.value)}
              value={columnName}
            />
          </div>
          <div className="w-full">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ColumnModalUpdate;
