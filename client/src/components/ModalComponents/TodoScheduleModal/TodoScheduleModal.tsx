import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  todoClose,
  todoContent,
  todoDate,
  todoDatePicker,
  todoSave,
  todoSaveBackground,
  todoScheduleCenter,
  todoScheduleContainer,
  todoScheduleLeft,
  todoScheduleTitle,
  todoString,
  todoTrash,
  trash,
} from "./TodoScheduleModal.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { wrapper } from "../RegisterModal/RegisterModal.css";

const TodoScheduleModal = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={wrapper}>
      <div className={todoScheduleContainer}>
        <div className={todoScheduleLeft}>
          <div className={todoTrash}>
            <FaRegTrashAlt className={trash} />
          </div>
        </div>
        <div className={todoScheduleCenter}>
          <div className={todoScheduleTitle}>일정</div>
          <div className={todoDate}>
            <div className={todoString}>기한 : </div>
            <div>
              <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setStartDate(date)}
                className={todoDatePicker}
              />
            </div>
          </div>

          <div className={todoString}>내용 : </div>
          <textarea className={todoContent}></textarea>
          <div className={todoSaveBackground}>
            <button className={todoSave}>저장</button>
          </div>
        </div>
        <VscChromeClose className={todoClose} />
      </div>
    </div>
  );
};

export default TodoScheduleModal;
