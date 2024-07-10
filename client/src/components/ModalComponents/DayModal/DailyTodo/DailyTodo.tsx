import React from "react";
import { dailyTodo, dailyTodoContent, dailyTodoTitle } from "./DailyTodo.css";
import { toggleTodoScheduleModal } from "../../../../store/store";

const DayTodoModal = () => {
  return (
    <div className={dailyTodo} onClick={toggleTodoScheduleModal}>
      <div className={dailyTodoTitle}>2024-07-10</div>
      <div className={dailyTodoContent}>프로젝트 1</div>
    </div>
  );
};

export default DayTodoModal;
