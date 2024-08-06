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
  titleInput,
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
import { ko } from "date-fns/locale";

const TaskModal = () => {
  const { task, isNewTask } = useTaskStore();

  const selectedDate = useUserInfoStore((state) => state.selectedDate);
  const { addTask, updateTask, deleteTask } = useMainStore((state) => state.actions);
  const setIsNewTask = useTaskStore((state) => state.setIsNewTask);

  const [startDate, setStartDate] = useState(() => {
    if (selectedDate) {
      return selectedDate;
    } else {
      return task.date;
    }
  });

  const clickSaveButton = () => {
    if (startTime && endTime && startTime.isBefore(endTime)) {
      const newTask = {
        date: dayjs(startDate).format("YYYY-MM-DD"),
        startTime: dayjs(startTime).format("HH:mm"),
        endTime: dayjs(endTime).format("HH:mm"),
        title: title,
        detail: detail,
      };

      if (isNewTask) {
        addTask(task.listIndex, newTask);
        postAddTaskAPI(
          title,
          detail,
          dayjs(startDate).format("YYYY-MM-DD"),
          dayjs(startDate).format("YYYY-MM-DD"),
          dayjs(startTime).format("HH:mm"),
          dayjs(endTime).format("HH:mm"),
        );
      } else {
        if (task.taskId) {
          updateTask(task.listIndex, task.taskIndex, newTask);
          putUpdateTaskAPI(
            task.taskId,
            title,
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

      setIsNewTask(false);
      toggleTaskModal();
    } else {
      alert("시간을 올바르게 입력해주세요!");
    }
  };

  const clickDeleteButton = () => {
    if (task.taskId !== undefined) {
      deleteTaskAPI(task.taskId);
      deleteTask(task.listIndex, task.taskIndex);
      toggleTaskModal();
    } else {
      alert("삭제에 실패했습니다! 다시 시도해주세요");
    }
  };

  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(
    dayjs(`${startDate} ${task.startTime}`, "YYYY-MM-DD HH:mm"),
  );
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(dayjs(`${startDate} ${task.endTime}`, "YYYY-MM-DD HH:mm"));
  const [detail, setDetail] = useState(task.detail || "");
  const [title, setTitle] = useState(task.title || "");

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
                locale={ko}
                dateFormatCalendar="YYYY년 MMMM"
                selected={new Date(startDate)}
                dateFormat="yyyy-MM-dd"
                onChange={(datePickerDate) => {
                  if (datePickerDate) {
                    setStartDate(datePickerDate);
                  } else {
                    alert("날짜 변경에 실패했습니다! 다시 시도해주세요");
                  }
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
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className={scheduleDate}>
            <div className={scheduleString}>제목 : </div>
            <input
              className={titleInput}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
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
