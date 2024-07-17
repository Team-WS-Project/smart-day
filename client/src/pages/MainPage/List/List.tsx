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
import useMainStore from "../../../store/mainStore";
import { toggleTaskModal } from "../../../store/store";
import Task from "../Task/Task";

type TTask = {
  taskId: number;
  listIndex: number;
  date: Date;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

type TaskList = {
  listIndex: number;
  tasks: TTask[];
}

const List = ({listIndex, tasks}: TaskList) => {
  const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const { standardDate } = useMainStore();
  
  return (
    <div className={taskListsContainerBox}>
      <div className={containerTitle}>
        <text className={text1}>{standardDate.getDate() + listIndex}</text>
        <text className={text2}>{dayOfTheWeek[(standardDate.getDay() + listIndex) % 7]}</text>
        <TiWeatherWindyCloudy className={weatherIcon} />
      </div>
      <div className={taskListArea}>
        {
          tasks
          ?
          tasks.map((item) => (
            <Task
              taskId={item.taskId}
              listIndex={listIndex}
              date={item.date}
              startTime={item.startTime}
              endTime={item.endTime}
              title={item.title}
              description={item.description}
            />
          ))
          : null
        }
        <div
          className={newTaskButton}
          onClick={toggleTaskModal}
        >
          + 새 일정 추가
        </div>
      </div>
    </div>
  );
};

export default List;
