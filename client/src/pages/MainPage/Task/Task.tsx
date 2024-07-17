import { FC } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { taskDetail, taskStyle, trashIcon } from "./Task.css";
import { toggleTaskModal } from "../../../store/store";
import useMainStore from "../../../store/mainStore";

// 임시 타입
type TTaskProps = {
  taskId: number;
  listIndex: number;
  startTime: string;
  endTime: string;
  title: string,
  description: string;
  userId: number;
};

const Task = ({
  taskId,
  listIndex,
  startTime,
  endTime,
  userId,
  title,
  description,
}: TTaskProps) => {
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
