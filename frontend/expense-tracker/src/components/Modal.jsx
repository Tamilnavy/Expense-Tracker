import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {

  if (!isOpen) return null;   // ✅ Prevent render if closed

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center w-full h-full overflow-y-auto bg-black/50">
      
      <div className="relative p-4 w-full max-w-2xl">
        
        <div className="relative bg-white rounded-lg shadow-sm">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>

            <button
              type="button"
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;