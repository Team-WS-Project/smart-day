import { FaRegTrashAlt } from "react-icons/fa";
import { taskDetail, taskStyle, trashIcon } from "./Task.css";
import { toggleTaskModal } from "../../../store/modalStore";
import useMainStore from "../../../store/mainStore";
import useTaskStore from "../../../store/taskStore";
// import dayjs, { Dayjs } from "dayjs";
import { useUserInfoStore } from "../../../store/userInfoStore";

type TTask = {
  id?: number;
  taskIndex: number;
  listIndex: number;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  detail: string;
};

const Task = ({ id, taskIndex, listIndex, date, startTime, endTime, title, detail }: TTask) => {
  const { deleteTask } = useMainStore((state) => state.actions);
  const updateTask = useTaskStore((state) => state.updateTask);
  const setIsNewTask = useTaskStore((state) => state.setIstNewTask);
  const { initializeSelectedDate } = useUserInfoStore((state) => state.actions);

  const clickTaskDiv = () => {
    const nowTask = {
      taskId: id,
      taskIndex: taskIndex,
      listIndex: listIndex,
      date: date,
      startTime: startTime,
      endTime: endTime,
      title: title,
      detail: detail,
    };
    initializeSelectedDate();
    setIsNewTask(false);
    updateTask(nowTask);
    toggleTaskModal();
  };

  const clickTrashIcon = () => {
    if (id) {
      // 여기에 delete api 연결 - axios
      deleteTask(listIndex, taskIndex);
    } else {
      deleteTask(listIndex, taskIndex);
    }
  };

  return (
    <div>
      <div className={taskStyle}>
        <div className={taskDetail} onClick={clickTaskDiv}>
          {startTime} ~ {endTime}
          <br />
          {detail ? detail.substring(0, 6) + (detail.length >= 6 ? "..." : "") : null}
        </div>
        <FaRegTrashAlt className={trashIcon} onClick={clickTrashIcon} />
      </div>
    </div>
  );
};

export default Task;
