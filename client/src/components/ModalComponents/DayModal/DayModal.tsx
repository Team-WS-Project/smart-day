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
} from "./DayModal.css";
import { CiCalendarDate } from "react-icons/ci";
import { TiWeatherDownpour } from "react-icons/ti";
import { VscChromeClose } from "react-icons/vsc";
import DayTodoModal from "./DailyTodo/DailyTodo";
import DaySchedule from "./DailyScheduleModal/DailySchedule";

const DayModal = () => {
  return (
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
      <div className={dayModalClose}>
        <VscChromeClose />
      </div>
    </div>
  );
};

export default DayModal;
