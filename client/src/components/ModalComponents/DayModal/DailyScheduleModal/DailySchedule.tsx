import React from "react";
import { dailySchedule, dailyScheduleContent, dailyScheduleTitle } from "./DailySchedule.css";
import { toggleTaskModal } from "../../../../store/modalStore";
import { DailySchedule } from "../../../../store/dayStore";

const DaySchedule = ({ startTime, endTime, title }: DailySchedule) => {
  return (
    <div className={dailySchedule} onClick={toggleTaskModal}>
      <div className={dailyScheduleTitle}>
        {startTime} ~ {endTime}
      </div>
      <div className={dailyScheduleContent}>{title}</div>
    </div>
  );
};

export default DaySchedule;
