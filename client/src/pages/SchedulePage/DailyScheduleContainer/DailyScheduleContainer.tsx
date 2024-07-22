import React from "react";
import { dailyContainer, dateTitle, scheduleList } from "./DailyScheduleContainer.css";
import { toggleDayModal } from "../../../store/modalStore";
import { Schedule } from "../../../store/scheduleStore";

const DailyScheduleContainer = ({ start_date, titles }: Schedule) => {
  return (
    <div className={dailyContainer} onClick={toggleDayModal}>
      <div className={dateTitle}>{start_date}</div>
      <div className={scheduleList}>
        <ul>
          {titles.map((schedule, index) => (
            <li key={index}>{schedule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyScheduleContainer;
