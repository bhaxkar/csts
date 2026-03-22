import { IoIosCloseCircle } from "react-icons/io";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-model-bg backdrop-blur-sm">

      <div className="bg-model rounded-lg shadow-lg max-w-xl md:max-w-3xl lg:max-w-5xl w-full px-2  md:px-6">

        <div className="flex items-center justify-between text-primary-text py-4 border-b-1 border-primary">
          <p className="text-lg font-mono">{title}</p>
          <button onClick={onClose} className="cursor-pointer">
            <IoIosCloseCircle className="text-3xl border-2 border-gray-200 rounded-full" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
