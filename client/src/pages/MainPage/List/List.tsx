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
import { toggleTaskModal } from "../../../store/modalStore";
import Task from "../Task/Task";
import useTaskStore from "../../../store/taskStore";
import dayjs from "dayjs";

type TTask = {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  detail: string;
};

type TaskList = {
  listIndex: number;
  tasks: TTask[];
};

const List = ({ listIndex, tasks }: TaskList) => {
  const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const { standardDate } = useMainStore();
  const updateTask = useTaskStore((state) => state.updateTask);
  const setIsNewTask = useTaskStore((state) => state.setIsNewTask);
  const nowDate = dayjs(standardDate).add(listIndex, "day");

  const addTask = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const emptyTask = {
      taskIndex: -1,
      listIndex: listIndex,
      date: dayjs(standardDate).add(listIndex, "day").format("YYYY-MM-DD"),
      startTime: "",
      endTime: "",
      title: "",
      detail: "",
    };
    setIsNewTask(true);
    updateTask(emptyTask);
    toggleTaskModal();
  };

  return (
    <div className={taskListsContainerBox}>
      <div className={containerTitle}>
        <text className={text1}>{nowDate.format("DD")}</text>
        <text className={text2}>{dayOfTheWeek[(standardDate.getDay() + listIndex) % 7]}</text>
        <TiWeatherWindyCloudy className={weatherIcon} />
      </div>
      <div className={taskListArea}>
        {tasks
          ? tasks.map((item, index) => (
              <Task
                id={item.id}
                taskIndex={index}
                listIndex={listIndex}
                date={item.date}
                startTime={item.startTime}
                endTime={item.endTime}
                title={item.title}
                detail={item.detail}
              />
            ))
          : null}
        <div className={newTaskButton} onClick={(e) => addTask(e)}>
          + 새 일정 추가
        </div>
      </div>
    </div>
  );
};

export default List;
