import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ trigger, title, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50"
      onClick={handleOutsideClick}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative mx-auto my-6 bg-white rounded-lg shadow-xl w-auto max-w-[90vw]"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
            {title}
          </h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-gray-900 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-auto max-h-[60vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      {isOpen && createPortal(modalContent, document.body)}
    </>
  );
}
