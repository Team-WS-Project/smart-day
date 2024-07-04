import React from "react";
import {
  dailySchedule,
  dailyScheduleContent,
  dailyScheduleTitle,
} from "./DailySchedule.css";

const DaySchedule = () => {
  return (
    <div className={dailySchedule}>
      <div className={dailyScheduleTitle}>09:00 ~ 11:00</div>
      <div className={dailyScheduleContent}>일정</div>
    </div>
  );
};

export default DaySchedule;
