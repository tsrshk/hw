import { FC, ReactNode } from 'react';
import Modal from './Modal';

type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: ReactNode;
};

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel, message }) => (
  <Modal isOpen={isOpen} onClose={onCancel}>
    <div className="flex flex-col items-center">
      <div className="text-lg font-semibold text-gray-900 mb-6 text-center">{message}</div>
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal; 