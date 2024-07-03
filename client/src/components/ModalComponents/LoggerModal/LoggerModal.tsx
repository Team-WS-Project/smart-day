import { useState } from "react";
import {
  body,
  closeButton,
  dateBox,
  dateTimeBox,
  descriptionBox,
  header,
  modalWindow,
  timeBox,
  title,
  wrapper,
} from "./LoggerModal.css";
import { FiX } from "react-icons/fi";

const LoggerModal = () => {
  const tmp_Data = [
    {
      date: new Date(),
      description: "OO부분을 OO하였습니다1.",
    },
    {
      date: new Date(),
      description: "OO부분을 OO하였습니다2.",
    },
    {
      date: new Date(),
      description: "OO부분을 OO하였습니다3.",
    },
    {
      date: new Date(),
      description: "OO부분을 OO하였습니다4.",
    },
  ];

  return (
    <div>
      <div className={wrapper}>
        <div className={modalWindow}>
          <div className={header}>
            <div className={title}> 수정 이력 </div>
            <FiX className={closeButton} />
          </div>
          {tmp_Data.map((elem, index) => (
            <div className={body} key={index}>
              <div className={dateTimeBox}>
                <div className={dateBox}>
                  {String(elem.date.toLocaleDateString())}
                </div>
                <div className={timeBox}>
                  {String(elem.date.toLocaleTimeString())}
                </div>
              </div>
              <div className={descriptionBox}>{elem.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoggerModal;
