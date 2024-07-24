import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  scheduleCenter,
  scheduleClose,
  scheduleContainer,
  scheduleContent,
  scheduleDate,
  scheduleDatePicker,
  scheduleLeft,
  scheduleSave,
  scheduleSaveBackground,
  scheduleString,
  scheduleTime,
  scheduleTitle,
  scheduleTrash,
  timePicker,
  trash,
  wrapper,
} from "./TaskModal.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { toggleTaskModal } from "../../../store/modalStore";
import { useUserInfoStore } from "../../../store/userInfoStore";

import useTaskStore from "../../../store/taskStore";
import useMainStore from "../../../store/mainStore";
import { deleteTaskAPI, postAddTaskAPI, putUpdateTaskAPI } from "../../../apis/mainPageAPI";

const TaskModal = () => {
  const { task, isNewTask } = useTaskStore();

  const selectedDate = useUserInfoStore((state) => state.selectedDate);
  const { addTask, updateTask, deleteTask } = useMainStore((state) => state.actions);

  const [startDate, setStartDate] = useState(() => {
    if (selectedDate) {
      return selectedDate;
    } else {
      return task.date;
    }
  });

  const clickSaveButton = () => {
    const newTask = {
      date: dayjs(startDate).format("YYYY-MM-DD"),
      startTime: dayjs(startTime).format("HH:mm"),
      endTime: dayjs(endTime).format("HH:mm"),
      title: "",
      detail: detail,
    };
    // console.log(newTask);

    if (isNewTask) {
      console.log("new");
      if (task.taskId) {
        addTask(task.listIndex, newTask);
      } else {
        // 스케줄 추가
        postAddTaskAPI(
          "",
          detail,
          dayjs(startDate).format("YYYY-MM-DD"),
          dayjs(startDate).format("YYYY-MM-DD"),
          dayjs(startTime).format("HH:mm"),
          dayjs(endTime).format("HH:mm"),
        );
        addTask(task.listIndex, newTask);
      }
    } else {
      if (task.taskId) {
        updateTask(task.listIndex, task.taskIndex, newTask);
        // fetch - 스케줄 수정
        putUpdateTaskAPI(
          task.taskId,
          "",
          detail,
          dayjs(startDate).format("YYYY-MM-DD"),
          dayjs(startDate).format("YYYY-MM-DD"),
          dayjs(startTime).format("HH:mm"),
          dayjs(endTime).format("HH:mm"),
        );
      } else {
        updateTask(task.listIndex, task.taskIndex, newTask);
      }
    }

    toggleTaskModal();
  };

  const clickDeleteButton = () => {
    deleteTaskAPI(task.taskId);
    deleteTask(task.listIndex, task.taskIndex);
    toggleTaskModal();
  };

  const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(`${startDate} ${task.startTime}`, "YYYY-MM-DD HH:mm"));
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs(`${startDate} ${task.endTime}`, "YYYY-MM-DD HH:mm"));
  const [detail, setDetail] = useState(task.detail || "");

  return (
    <div className={wrapper}>
      <div className={scheduleContainer}>
        <div className={scheduleLeft}>
          <div className={scheduleTrash} onClick={clickDeleteButton}>
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
                  <TimePicker
                    className={timePicker}
                    defaultValue={endTime}
                    onChange={(time) => {
                      setEndTime(time);
                      console.log(endTime);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className={scheduleString}>내용 : </div>
          <textarea
            className={scheduleContent}
            defaultValue={task.detail}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>
          <div className={scheduleSaveBackground}>
            <button className={scheduleSave} onClick={clickSaveButton}>
              저장
            </button>
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
