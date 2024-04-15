import { Button, Label, Modal, TextInput } from "flowbite-react";

const ColumnModal = ({ openModal, setOpenModal }) => {
  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} className="dark:bg-slate-900">
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create column</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Column name" />
            </div>
            <TextInput id="email" placeholder="In progress" required />
          </div>
          <div className="w-full">
            <Button>Create</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ColumnModal;
