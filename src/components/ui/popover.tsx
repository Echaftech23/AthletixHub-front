import React, { useState, ReactNode } from 'react';
import { FaCirclePlus, FaXmark } from "react-icons/fa6";

interface ModalProps {
  trigger?: ReactNode;
  title: string;
  children: ReactNode;
  buttonText?: string;
}

export function Modal({ trigger, title, children, buttonText }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {buttonText ? (
        <button 
          onClick={openModal} 
          className="flex items-center py-2 px-3 bg-primary text-white space-x-2 rounded-sm font-semibold hover:bg-primary/90"
        >
          <FaCirclePlus className="text-white text-2xl" />
          <p className="-mt-1">Add {buttonText}</p>
        </button>
      ) : (
        trigger && <div onClick={openModal}>{trigger}</div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{title}</h2>
              <button 
                onClick={closeModal} 
                className="text-gray-600 hover:text-gray-900"
              >
                <FaXmark className="text-2xl" />
              </button>
            </div>
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}