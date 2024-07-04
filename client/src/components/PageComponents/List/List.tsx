import { FC } from "react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  task,
  text2,
  text1,
  newTaskButton,
  containerTitle,
  weatherIcon,
  trashIcon,
  taskListArea,
  taskListsContainerBox,
  taskDetail,
} from "./List.css";
import { useNavigate } from "react-router-dom";

const List: FC = () => {
  const navigate = useNavigate();

  const openTaskModal = () => {
    navigate("./taskmodal");
  };

  return (
    <div className={taskListsContainerBox}>
      <div className={containerTitle}>
        <text className={text1}>날짜</text>
        <text className={text2}>요일</text>
        <TiWeatherWindyCloudy className={weatherIcon} />
      </div>
      <div className={taskListArea}>
        <div className={task}>
          <div className={taskDetail} onClick={openTaskModal}>
            09:00 ~ 11:00
            <br />
            운동
          </div>
          <FaRegTrashAlt className={trashIcon} />
        </div>
        <div className={task}>
          <div className={taskDetail} onClick={openTaskModal}>
            09:00 ~ 11:00
            <br />
            운동
          </div>
          <FaRegTrashAlt className={trashIcon} />
        </div>
        .<br />
        <br />
        .<br />
        <br />
        .<br />
        <br />
        .<br />
        <br />
        .<br />
        <br />
        .<br />
        <br />
        <div className={newTaskButton} onClick={openTaskModal}>
          + 새 일정 추가
        </div>
      </div>
    </div>
  );
};

export default List;
