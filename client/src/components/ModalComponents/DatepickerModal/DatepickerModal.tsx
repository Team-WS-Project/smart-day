import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  body,
  closeButton,
  customCalendar,
  header,
  modalWindow,
  okButton,
  title,
  wrapper,
} from "./DatepickerModal.css";
import { useState } from "react";
import { ko } from "date-fns/locale";
import { FiX } from "react-icons/fi";
import { toggleDatepickerModal, toggleTaskModal } from "../../../store/modalStore";
import { useUserInfoStore } from "../../../store/userInfoStore";
import useTaskStore from "../../../store/taskStore";
import dayjs from "dayjs";

const DatepickerModal = () => {
  const [startDate, setStartDate] = useState(new Date());

  const { setSelectedDate, initializeSelectedDate } = useUserInfoStore((state) => ({
    setSelectedDate: state.actions.setSelectedDate,
    initializeSelectedDate: state.actions.initializeSelectedDate,
  }));
  const setIsNewTask = useTaskStore((state) => state.setIsNewTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setSelectedDate(date);
    }
    const emptyTask = {
      taskIndex: -1,
      listIndex: -1,
      date: dayjs(date).format("YYYY-MM-DD"),
      startTime: "",
      endTime: "",
      title: "",
      detail: "",
    };
    setIsNewTask(true);
    updateTask(emptyTask);
    toggleTaskModal();
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>날짜 선택</div>
          <FiX
            className={closeButton}
            onClick={() => {
              toggleDatepickerModal();
              initializeSelectedDate();
            }}
          />
        </div>

        <div className={body}>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            inline
            locale={ko}
            monthsShown={1}
            dateFormat="YYYY-MM-dd"
            dateFormatCalendar="YYYY년 MMMM"
            className={customCalendar}
          />
        </div>
        <div
          className={okButton}
          onClick={() => {
            toggleDatepickerModal();
            initializeSelectedDate();
          }}
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default DatepickerModal;
