import { TiWeatherWindyCloudy } from "react-icons/ti";
import {
  text2,
  text1,
  newTaskButton,
  containerTitle,
  weatherIcon,
  taskListArea,
  taskListsContainerBox,
} from "./List.css";
import { useNavigate } from "react-router-dom";
import Task from "../Task/Task";

const List = () => {
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
        <Task
          taskId={1}
          startTime={"09:00"}
          endTime={"11:00"}
          userId={1}
          date={"2024-07-07"}
          taskTitle={"운동"}
          taskDescription={"내용"}
        />
      
        <div className={newTaskButton} onClick={openTaskModal}>
          + 새 일정 추가
        </div>
      </div>
    </div>
  );
};

export default List;
