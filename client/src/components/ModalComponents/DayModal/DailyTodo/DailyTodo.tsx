import React from "react";
import { dailyTodo, dailyTodoContent, dailyTodoTitle } from "./DailyTodo.css";

const DayTodoModal = () => {
  return (
    <div className={dailyTodo}>
      <div className={dailyTodoTitle}>2024-07-10</div>
      <div className={dailyTodoContent}>프로젝트 1</div>
    </div>
  );
};

export default DayTodoModal;
