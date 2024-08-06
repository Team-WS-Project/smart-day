import { useEffect, useRef, useState } from "react";
import {
  center,
  dailyTodoColumn,
  dateUponIcon,
  dayModalClose,
  dayModalLeft,
  dayModalRight,
  dayModalTitle,
  dayTitleIcons,
  dayTitleWeekday,
  modal,
  scheduleAddButton,
  todoAddButton,
  wrapper,
} from "./DayModal.css";
import { CiCalendar } from "react-icons/ci";
import { VscChromeClose } from "react-icons/vsc";
import DayTodoModal from "./DailyTodo/DailyTodo";
import DaySchedule from "./DailyScheduleModal/DailySchedule";
import useModalStore, { toggleDayModal, toggleTaskModal, toggleTodoScheduleModal } from "../../../store/modalStore";
import TodoScheduleModal from "../TodoScheduleModal/TodoScheduleModal";
import TaskModal from "../TaskModal/TaskModal";
import useDailyScheduleStore, { DailySchedule } from "../../../store/dayStore";
import useDailyTodoStore, { DailyTodo } from "../../../store/todoStore";
import { getDailySchedules } from "../../../apis/getDailySchedulesAPI";
import { getDailyTodos } from "../../../apis/getDailyTodosAPI";
import dayjs from "dayjs";
import useTaskStore from "../../../store/taskStore";
import useTodoScheduleStore from "../../../store/todoScheduleStore";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindy,
  TiWeatherWindyCloudy,
} from "react-icons/ti";
import { TbCloudQuestion } from "react-icons/tb";
import { useWeatherStore } from "../../../store/weatherStore";

const weatherIcons = [
  <TiWeatherDownpour />,
  <TiWeatherSunny />,
  <TiWeatherWindyCloudy />,
  <TiWeatherCloudy />,
  <TiWeatherPartlySunny />,
  <TiWeatherSnow />,
  <TiWeatherStormy />,
  <TiWeatherWindy />,
  <TiWeatherShower />,
];

const DayModal = () => {
  const { taskModal, todoScheduleModal } = useModalStore();
  const hasPageBeenRendered = useRef({ effect: false });

  const dailySchedules = useDailyScheduleStore((state) => state.dailySchedules);
  const date = useDailyScheduleStore((state) => state.date);

  const dailyTodos = useDailyTodoStore((state) => state.dailyTodo);

  const scheduleActions = useDailyScheduleStore((state) => state.actions);
  const todoActions = useDailyTodoStore((state) => state.actions);

  const updateTask = useTaskStore((state) => state.updateTask);
  const setIsNewTask = useTaskStore((state) => state.setIsNewTask);

  const { setDueDate } = useTodoScheduleStore();
  const weatherData = useWeatherStore((state) => state.weatherData);
  const [weatherIcon, setWeatherIcon] = useState(<TbCloudQuestion />);

  const getDayOfWeek = (date: Date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[date.getDay()];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        scheduleActions.clearSchedule();
        todoActions.clearTodo();
        const scheduleData = await getDailySchedules(date);
        scheduleData.forEach((item: DailySchedule) => {
          scheduleActions.addSchedule(item);
        });
        const todoData = await getDailyTodos(date);
        todoData.forEach((item: DailyTodo) => {
          todoActions.addTodo(item);
        });
      } catch (error) {
        console.error("Failed to fetch schedules and todos:", error);
      }
    };
    if (hasPageBeenRendered.current["effect"]) {
      fetchData();
    }
    hasPageBeenRendered.current["effect"] = true;
  }, [date, todoActions, scheduleActions, todoScheduleModal, taskModal]);

  useEffect(() => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    if (Object.prototype.hasOwnProperty.call(weatherData, dateString)) {
      setWeatherIcon(weatherIcons[weatherData[dateString]]);
    } else {
      setWeatherIcon(<TbCloudQuestion />);
    }
  }, [date]);

  const clickAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const emptyTask = {
      taskIndex: 0,
      listIndex: 0,
      date: dayjs(date).format("YYYY-MM-DD"),
      startTime: "",
      endTime: "",
      title: "",
      detail: "",
    };
    setIsNewTask(true);
    updateTask(emptyTask);
    toggleTaskModal();
  };

  const clickAddTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDueDate(dayjs(date).format("YYYY-MM-DD"));
    toggleTodoScheduleModal();
  };

  return (
    <div className={wrapper}>
      {todoScheduleModal && <TodoScheduleModal />}
      {taskModal && <TaskModal />}
      <div className={modal}>
        <div className={dayModalLeft}>
          <div className={dayModalTitle}>
            <div className={dayTitleIcons}>
              <CiCalendar />
            </div>
            <p className={dateUponIcon}>{date.getDate()}</p>
            <div className={dayTitleWeekday}>{getDayOfWeek(date)}</div>
            <div className={dayTitleIcons}>{weatherIcon}</div>
          </div>
          <div className={dailyTodoColumn}>
            {dailyTodos.map((todo, index) => (
              <DayTodoModal key={index} id={todo.id} due_date={todo.due_date} title={todo.title} />
            ))}
            <div className={center}>
              <button className={todoAddButton} onClick={(e) => clickAddTodo(e)}>
                + TODO 추가
              </button>
            </div>
          </div>
        </div>
        <div className={dayModalRight}>
          {dailySchedules.map((schedule, index) => (
            <DaySchedule
              key={index}
              id={schedule.id}
              title={schedule.title}
              detail={schedule.detail}
              start_date={date}
              start_time={schedule.start_time.slice(0, 5)}
              end_time={schedule.end_time.slice(0, 5)}
            />
          ))}
          <div>
            <button className={scheduleAddButton} onClick={(e) => clickAddTask(e)}>
              + 새 일정 추가
            </button>
          </div>
        </div>
        <div className={dayModalClose} onClick={toggleDayModal}>
          <VscChromeClose />
        </div>
      </div>
    </div>
  );
};

export default DayModal;
