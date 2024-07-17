import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  scheduleClose,
  scheduleContent,
  scheduleDate,
  scheduleDatePicker,
  scheduleSave,
  scheduleSaveBackground,
  scheduleCenter,
  scheduleContainer,
  scheduleLeft,
  scheduleTitle,
  scheduleString,
  scheduleTrash,
  trash,
  scheduleTime,
  timePicker,
  wrapper,
} from "./TaskModal.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { toggleTaskModal } from "../../../store/store";
// import { useUserInfoStore } from "../../../store/userInfoStore";

import useTaskStore from "../../../store/taskStore";

const TaskModal = () => {
  const { task } = useTaskStore();

  // const selectedDate = useUserInfoStore((state) => state.selectedDate);
  // const [startDate, setStartDate] = useState(selectedDate ?? new Date());

  const [startDate, setStartDate] = useState(new Date(task.date));
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(`${task.date} ${task.startTime}`, "YYYY-MM-DD HH:mm"));
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(`${task.date} ${task.endTime}`, "YYYY-MM-DD HH:mm"));
  return (
    <div className={wrapper}>
      <div className={scheduleContainer}>
        <div className={scheduleLeft}>
          <div className={scheduleTrash}>
            <FaRegTrashAlt className={trash} />
          </div>
        </div>
        <div className={scheduleCenter}>
          <div className={scheduleTitle}>일정 입력</div>
          <div className={scheduleDate}>
            <div className={scheduleString}>날짜 : </div>
            <div>
              <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                onChange={(datePickerDate) => {
                  setStartDate(datePickerDate);
                }}
                className={scheduleDatePicker}
              />
            </div>
          </div>
          <div className={scheduleDate}>
            <div className={scheduleString}>시간 : </div>
            <div className={scheduleTime}>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker className={timePicker} defaultValue={startTime} onChange={(time) => setStartTime(time)} />
                </LocalizationProvider>
              </div>
              <div>~</div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker className={timePicker} defaultValue={endTime} onChange={(time) => setEndTime(time)} />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className={scheduleString}>내용 : </div>
          <textarea className={scheduleContent} defaultValue={task.details}></textarea>
          <div className={scheduleSaveBackground}>
            <button className={scheduleSave}>저장</button>
          </div>
        </div>
        <div className={scheduleClose} onClick={toggleTaskModal}>
          <VscChromeClose />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
