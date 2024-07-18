import React from "react";
import { dailyContainer, dateTitle, scheduleList } from "./DailyScheduleContainer.css";
import { toggleDayModal } from "../../../store/modalStore";
import { Schedule } from "../../../store/scheduleStore";

const DailyScheduleContainer = ({ title, scheduleLists }: Schedule) => {
  return (
    <div className={dailyContainer} onClick={toggleDayModal}>
      <div className={dateTitle}>{title}</div>
      <div className={scheduleList}>
        <ul>
          {scheduleLists.map((schedule, index) => (
            <li key={index}>{schedule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyScheduleContainer;
