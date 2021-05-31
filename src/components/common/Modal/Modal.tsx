/* This example requires Tailwind CSS v2.0+ */
import React, { FunctionComponent } from "react";

interface ModalProp {
  toggleOpen: boolean;
  children: React.ReactNode;
}

export const Modal: FunctionComponent<ModalProp> = ({ toggleOpen, children }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ease-in-out duration-700 opacity-0 ${
        toggleOpen ? "opacity-100 visible" : "invisible"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className={`flex self-center md:inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
