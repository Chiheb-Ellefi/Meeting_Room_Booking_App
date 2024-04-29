import Modal from "./Modal";
import { Trash } from "lucide-react";
const DeleteConfirmationModal = ({ open, onClose, handleDelete, text }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-56">
        <Trash size={56} className="mx-auto text-red-600" />

        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800 ">Confirm Delete</h3>
          <p className=" text-sm text-gray-500 ">{text}</p>
        </div>
        <div className="flex gap-4">
          <button
            className="btn btn-light w-full"
            onClick={() => {
              onClose();
            }}
          >
            {"Cancel"}
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
            className={` w-full btn-animated 
               btn btn-danger
            `}
          >
            {"Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
