import React, { useEffect } from "react";
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
import { TiWeatherDownpour } from "react-icons/ti";
import { VscChromeClose } from "react-icons/vsc";
import DayTodoModal from "./DailyTodo/DailyTodo";
import DaySchedule from "./DailyScheduleModal/DailySchedule";
import useModalStore, { toggleDayModal } from "../../../store/modalStore";
import TodoScheduleModal from "../TodoScheduleModal/TodoScheduleModal";
import TaskModal from "../TaskModal/TaskModal";
import useDailyScheduleStore, { DailySchedule } from "../../../store/dayStore";
import useDailyTodoStore, { DailyTodo } from "../../../store/todoStore";
import { getDailySchedules } from "../../../apis/getDailySchedulesAPI";

const DayModal = () => {
  const { showTodoScheduleModal } = useModalStore((state) => ({ showTodoScheduleModal: state.todoScheduleModal }));
  const { showTaskModal } = useModalStore((state) => ({ showTaskModal: state.taskModal }));

  const dailySchedules = useDailyScheduleStore((state) => state.dailySchedules);
  const date = useDailyScheduleStore((state) => state.date);

  const dailyTodos = useDailyTodoStore((state) => state.dailyTodo);

  const scheduleActions = useDailyScheduleStore((state) => state.actions);
  const todoActions = useDailyTodoStore((state) => state.actions);

  const getDayOfWeek = (date: Date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[date.getDay()];
  };

  useEffect(() => {
    const fetchDailySchedules = async () => {
      try {
        // scheduleActions.clearSchedule();
        const data = await getDailySchedules(date);
        data.forEach((item: DailySchedule) => {
          scheduleActions.addSchedule(item);
        });
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      }
    };
    fetchDailySchedules();
  }, [date, scheduleActions]);

  useEffect(() => {
    const fetchDailyTodos = async () => {
      try {
        // todoActions.clearTodo();
        const data = await getDailySchedules(date);
        data.forEach((item: DailyTodo) => {
          todoActions.addTodo(item);
        });
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      }
    };
    fetchDailyTodos();
  }, [date, todoActions]);
  return (
    <div className={wrapper}>
      {showTodoScheduleModal && <TodoScheduleModal />}
      {showTaskModal && <TaskModal />}
      <div className={modal}>
        <div className={dayModalLeft}>
          <div className={dayModalTitle}>
            <div className={dayTitleIcons}>
              <CiCalendar />
            </div>
            <p className={dateUponIcon}>{date.getDate()}</p>
            <div className={dayTitleWeekday}>{getDayOfWeek(date)}</div>
            <div className={dayTitleIcons}>
              <TiWeatherDownpour />
            </div>
          </div>
          <div className={dailyTodoColumn}>
            {dailyTodos.map((todo, index) => (
              <DayTodoModal key={index} date={todo.date} title={todo.title} />
            ))}
            <div className={center}>
              <button className={todoAddButton}>+ TODO 추가</button>
            </div>
          </div>
        </div>
        <div className={dayModalRight}>
          {dailySchedules.map((schedule, index) => (
            <DaySchedule key={index} startTime={schedule.startTime} endTime={schedule.endTime} title={schedule.title} />
          ))}
          <div>
            <button className={scheduleAddButton}>+ 새 일정 추가</button>
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
