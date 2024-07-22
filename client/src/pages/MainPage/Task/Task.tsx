import { FaRegTrashAlt } from "react-icons/fa";
import { taskDetail, taskStyle, trashIcon } from "./Task.css";
import { toggleTaskModal } from "../../../store/modalStore";
import useMainStore from "../../../store/mainStore";
import useTaskStore from "../../../store/taskStore";
// import dayjs, { Dayjs } from "dayjs";
import { useUserInfoStore } from "../../../store/userInfoStore";

type Task = {
  taskId: number;
  listIndex: number;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  details: string;
};

const Task = ({ taskId, listIndex, date, startTime, endTime, title, details }: Task) => {
  const { deleteTask } = useMainStore((state) => state.actions);
  const updateTask = useTaskStore((state) => state.updateTask);
  const { initializeSelectedDate } = useUserInfoStore((state) => state.actions);

  const clickTaskDiv = () => {
    initializeSelectedDate();
    updateTask(date, startTime, endTime, details); // 이 부분 taskId 값도 taskStore에 넣어야 할 듯
    toggleTaskModal();
  };

  const clickTrashIcon = () => {
    // 여기에 delete api 연결 - axios
    deleteTask(listIndex, taskId);
  };

  return (
    <div>
      <div className={taskStyle}>
        <div className={taskDetail} onClick={clickTaskDiv}>
          {startTime} ~ {endTime}
          <br />
          {details.substring(0, 6) + (details.length >= 6 ? "..." : "")}
        </div>
        <FaRegTrashAlt className={trashIcon} onClick={clickTrashIcon} />
      </div>
    </div>
  );
};

export default Task;
