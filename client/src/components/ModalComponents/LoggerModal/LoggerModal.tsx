import { useState } from "react";
import {
  body,
  closeButton,
  dateBox,
  dateTimeBox,
  descriptionBox,
  footer,
  header,
  leftArrow,
  modalWindow,
  rightArrow,
  timeBox,
  title,
  wrapper,
} from "./LoggerModal.css";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

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
      description: "OO부분을 OO하였습니다3.",
    },
  ];
  tmp_Data.reverse(); // 최신순?

  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + 5 < tmp_Data.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}> 수정 이력 </div>
          <FiX className={closeButton} />
        </div>
        {tmp_Data.slice(currentIndex, currentIndex + 5).map((elem, index) => (
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
        <div className={footer}>
          <FiChevronLeft className={leftArrow} onClick={handlePrevClick} />
          <FiChevronRight className={rightArrow} onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
};

export default LoggerModal;
