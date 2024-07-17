import React from "react";
import { dailyContainer, dateTitle, scheduleList } from "./DailyScheduleContainer.css";
import { toggleDayModal } from "../../../store/store";

const DailyScheduleContainer = () => {
  return (
    <div className={dailyContainer} onClick={toggleDayModal}>
      <div className={dateTitle}>2024-07-01</div>
      <div className={scheduleList}>
        <ul>
          <li>팀 회의</li>
          <li>개인 스터디</li>
          <li>강의 수강</li>
          <li>일정1</li>
          <li>일정2</li>
          <li>일정3</li>
          <li>일정4</li>
          <li>일정5</li>
          <li>일정6</li>
        </ul>
      </div>
    </div>
  );
};

export default DailyScheduleContainer;
