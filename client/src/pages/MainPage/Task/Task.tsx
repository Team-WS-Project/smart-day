import { FaRegTrashAlt } from "react-icons/fa";
import { taskDetail, taskStyle, trashIcon } from "./Task.css";
import { toggleTaskModal } from "../../../store/store";
import useMainStore from "../../../store/mainStore";

type Task = {
  taskId: number;
  listIndex: number;
  date: Date;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

const Task = ({
  taskId,
  listIndex,
  date,
  startTime,
  endTime,
  userId,
  title,
  description,
}: Task) => {
  const { deleteTask } = useMainStore((state) => state.actions);

  return (
    <div>
      <div className={taskStyle}>
        <div
          className={taskDetail}
          onClick={toggleTaskModal}
        >
          {startTime} ~ {endTime}
          <br />
          {title}
        </div>
        <FaRegTrashAlt
          className={trashIcon}
          onClick={() => deleteTask(listIndex, taskId)}
        />
      </div>
    </div>
  )
};

export default Task;
