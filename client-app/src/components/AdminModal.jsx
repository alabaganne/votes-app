import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Close } from "../assets";

const AdminModal = (props) => {
  const handleCloseClick = () => {
    props.onClose();
  };

  return ReactDOM.createPortal(
    <section className="fixed inset-0 z-50 flex items-center justify-center m-4">
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="bg-white w-[90%] xs:w-[80%] sm:w-[60%] md:w-[35%] h-[90%] ss:h-4/5 sm:p-8 p-4 rounded-sm z-10 flex flex-col justify-start items-center ">
        <div className=" w-full flex justify-end">
          <img
            src={Close}
            alt="close"
            className="cursor-pointer "
            onClick={handleCloseClick}
          />
        </div>
        <p className="text-typo font-poppins font-medium text-lg w-[40%] text-center mt-4">
          {props.title} {props.year}
        </p>
        <div className=" w-full mt-16 flex flex-col gap-4 overflow-y-auto h-[550px]">
          {props.list.map((e, i) => (
            <div
              key={i}
              className=" boder-solid border-[1px] break-normal border-primary rounded-sm font-poppins text-sm font-normal text-primary w-full px-3 py-4"
            >
              {e}
            </div>
          ))}
        </div>
        <div className=" w-full flex justify-between mt-10 ">
          <button className=" border-solid border-[1px] border-primary font-poppins text-primary py-1 px-6 rounded-sm">
            Delete
          </button>
          <button
            onClick={handleCloseClick}
            className=" bg-primary font-poppins text-white py-1 px-6 rounded-sm"
          >
            Close
          </button>
        </div>
      </div>
    </section>,
    document.body
  );
};

export default AdminModal;
