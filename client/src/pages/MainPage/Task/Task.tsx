import { FC } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { taskDetail, taskStyle, trashIcon } from "./Task.css";

// 임시 타입
type TTaskProps = {
  taskId : number;
  startTime: string;
  endTime: string;
  date: string;
  taskTitle: string,
  taskDescription: string;
  userId : number;
};

const Task : FC<TTaskProps>= ({
  taskId,
  startTime,
  endTime,
  userId,
  date,
  taskTitle,
  taskDescription
}) => {
  return (
    <div>
      <div className={taskStyle}>
        <div className={taskDetail}>
          {startTime} ~ {endTime}
          <br />
          {taskTitle}
        </div>
        <FaRegTrashAlt className={trashIcon} />
      </div>
    </div>
  )
};

export default Task;
