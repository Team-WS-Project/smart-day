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
} from "./TaskModal.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { wrapper } from "../RegisterModal/RegisterModal.css";

const TaskModal = () => {
  const [startDate, setStartDate] = useState(new Date());
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
                onChange={(date) => setStartDate(date)}
                className={scheduleDatePicker}
              />
            </div>
          </div>
          <div className={scheduleDate}>
            <div className={scheduleString}>시간 : </div>
            <div className={scheduleTime}>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker className={timePicker} defaultValue={dayjs("2022-04-17T15:30")} />
                </LocalizationProvider>
              </div>
              <div>~</div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker className={timePicker} defaultValue={dayjs("2022-04-17T15:30")} />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className={scheduleString}>내용 : </div>
          <textarea className={scheduleContent}></textarea>
          <div className={scheduleSaveBackground}>
            <button className={scheduleSave}>저장</button>
          </div>
        </div>
        <VscChromeClose className={scheduleClose} />
      </div>
    </div>
  );
};

export default TaskModal;
