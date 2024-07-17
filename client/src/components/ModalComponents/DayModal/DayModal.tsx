import React from "react";
import {
  dailyTodoColumn,
  dayModalClose,
  dayModalLeft,
  dayModalRight,
  dayModalTitle,
  dayTitleIcons,
  dayTitleWeekday,
  modal,
  scheduleAddButton,
  wrapper,
} from "./DayModal.css";
import { CiCalendarDate } from "react-icons/ci";
import { TiWeatherDownpour } from "react-icons/ti";
import { VscChromeClose } from "react-icons/vsc";
import DayTodoModal from "./DailyTodo/DailyTodo";
import DaySchedule from "./DailyScheduleModal/DailySchedule";
import useModalStore, { toggleDayModal } from "../../../store/store";
import TodoScheduleModal from "../TodoScheduleModal/TodoScheduleModal";
import TaskModal from "../TaskModal/TaskModal";

const DayModal = () => {
  const { showTodoScheduleModal } = useModalStore((state) => ({ showTodoScheduleModal: state.todoScheduleModal }));
  const { showTaskModal } = useModalStore((state) => ({ showTaskModal: state.taskModal }));

  return (
    <div className={wrapper}>
      {showTodoScheduleModal && <TodoScheduleModal />}
      {showTaskModal && <TaskModal />}
      <div className={modal}>
        <div className={dayModalLeft}>
          <div className={dayModalTitle}>
            <div className={dayTitleIcons}>
              <CiCalendarDate />
            </div>
            <div className={dayTitleWeekday}>수</div>
            <div className={dayTitleIcons}>
              <TiWeatherDownpour />
            </div>
          </div>
          <div className={dailyTodoColumn}>
            <DayTodoModal />
            <DayTodoModal />
          </div>
        </div>
        <div className={dayModalRight}>
          <DaySchedule />
          <DaySchedule />
          <DaySchedule />
          <DaySchedule />
          <button className={scheduleAddButton}>+ 새 일정 추가</button>
        </div>
        <div className={dayModalClose} onClick={toggleDayModal}>
          <VscChromeClose />
        </div>
      </div>
    </div>
  );
};

export default DayModal;
