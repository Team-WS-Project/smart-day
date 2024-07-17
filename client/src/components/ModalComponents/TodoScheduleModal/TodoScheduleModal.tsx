import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  todoClose,
  todoContent,
  todoDate,
  todoDatePicker,
  todoInput,
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
import { toggleTodoScheduleModal } from "../../../store/store";
import useTodoScheduleStore from "../../../store/todoScheduleStore";

const TodoScheduleModal = () => {
  const { todoSchedule } = useTodoScheduleStore();

  const [startDate, setStartDate] = useState(new Date(todoSchedule.date));
  return (
    <div className={wrapper}>
      <div className={todoScheduleContainer}>
        <div className={todoScheduleLeft}>
          <div className={todoTrash}>
            <FaRegTrashAlt className={trash} />
          </div>
        </div>
        <div className={todoScheduleCenter}>
          <div className={todoScheduleTitle}>Todo</div>
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

          <div className={todoDate}>
            <div className={todoString}>제목 : </div>
            <input className={todoInput} defaultValue={todoSchedule.title}></input>
          </div>

          <div className={todoString}>내용 : </div>
          <textarea className={todoContent} defaultValue={todoSchedule.details}></textarea>
          <div className={todoSaveBackground}>
            <button className={todoSave}>저장</button>
          </div>
        </div>
        <VscChromeClose className={todoClose} onClick={toggleTodoScheduleModal} />
      </div>
    </div>
  );
};

export default TodoScheduleModal;
