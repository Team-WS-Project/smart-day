import React from "react";
import { dailySchedule, dailyScheduleContent, dailyScheduleTitle } from "./DailySchedule.css";
import { toggleTaskModal } from "../../../../store/store";

const DaySchedule = () => {
  return (
    <div className={dailySchedule} onClick={toggleTaskModal}>
      <div className={dailyScheduleTitle}>09:00 ~ 11:00</div>
      <div className={dailyScheduleContent}>일정</div>
    </div>
  );
};

export default DaySchedule;
